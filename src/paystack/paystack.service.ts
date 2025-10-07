import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';

@Injectable()
export class PaystackService {
  private readonly secretKey: string;
  private readonly baseUrl: string;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.secretKey = this.configService.get<string>('paystack.secretKey');
    this.baseUrl = this.configService.get<string>('paystack.baseUrl');
  }

  private async makePaystackRequest(
    endpoint: string,
    method: string = 'GET',
    body?: any,
  ) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new BadRequestException(data.message || 'Paystack API error');
      }

      return data;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to communicate with Paystack',
      );
    }
  }

  async initializeTransaction(dto: InitializeTransactionDto) {
    let customer = await this.prisma.customer.findUnique({
      where: { email: dto.email },
    });

    if (!customer) {
      customer = await this.prisma.customer.create({
        data: { email: dto.email },
      });
    }

    // unique reference
    const reference = `txn_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const paystackResponse = await this.makePaystackRequest(
      '/transaction/initialize',
      'POST',
      {
        email: dto.email,
        amount: dto.amount,
        currency: dto.currency,
        reference,
        callback_url: dto.callbackUrl,
      },
    );

    const transaction = await this.prisma.transaction.create({
      data: {
        reference,
        amount: dto.amount,
        currency: dto.currency,
        status: 'pending',
        customerId: customer.id,
        paystackResponse: paystackResponse.data,
      },
      include: {
        customer: true,
      },
    });

    return {
      message: 'Transaction initialized successfully',
      transaction,
      authorizationUrl: paystackResponse.data.authorization_url,
      accessCode: paystackResponse.data.access_code,
    };
  }

  async verifyTransaction(reference: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { reference },
      include: { customer: true },
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    const paystackResponse = await this.makePaystackRequest(
      `/transaction/verify/${reference}`,
    );

    const updatedTransaction = await this.prisma.transaction.update({
      where: { reference },
      data: {
        status: paystackResponse.data.status,
        paystackResponse: paystackResponse.data,
      },
      include: { customer: true },
    });

    return {
      message: 'Transaction verified',
      transaction: updatedTransaction,
    };
  }

  getAllTransactions() {
    return this.prisma.transaction.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  getTransactionsByCustomer(customerId: string) {
    return this.prisma.transaction.findMany({
      where: { customerId },
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
