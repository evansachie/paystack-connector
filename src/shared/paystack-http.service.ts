import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackHttpService {
  private readonly baseUrl: string;
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('paystack.baseUrl');
    this.secretKey = this.configService.get<string>('paystack.secretKey');
  }

  async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
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

  async get(endpoint: string) {
    return this.makeRequest(endpoint, 'GET');
  }

  async post(endpoint: string, body: any) {
    return this.makeRequest(endpoint, 'POST', body);
  }

  async put(endpoint: string, body: any) {
    return this.makeRequest(endpoint, 'PUT', body);
  }

  async delete(endpoint: string) {
    return this.makeRequest(endpoint, 'DELETE');
  }
}
