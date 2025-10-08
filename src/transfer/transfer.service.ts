import { Injectable } from '@nestjs/common';
import { PaystackHttpService } from '../shared/paystack-http.service';
import { BankTransferDto } from './dto/bank-transfer.dto';
import { MobileMoneyTransferDto } from './dto/mobile-money-transfer.dto';

@Injectable()
export class TransferService {
  constructor(private paystackHttp: PaystackHttpService) {}

  private async createRecipient(
    type: 'nuban' | 'ghipss' | 'mobile_money' | 'basa',
    name: string,
    accountNumber: string,
    bankCode: string,
    currency: string,
  ) {
    return this.paystackHttp.post('/transferrecipient', {
      type,
      name,
      account_number: accountNumber,
      bank_code: bankCode,
      currency,
    });
  }

  private async initiateTransfer(
    recipientCode: string,
    amount: number,
    currency: string,
    reference?: string,
    reason?: string,
  ) {
    const payload: any = {
      source: 'balance',
      amount,
      recipient: recipientCode,
      currency,
    };

    if (reference) {
      payload.reference = reference;
    }

    if (reason) {
      payload.reason = reason;
    }

    return this.paystackHttp.post('/transfer', payload);
  }

  async transferToBank(dto: BankTransferDto) {
    let recipientType: 'nuban' | 'ghipss' | 'basa' = 'nuban';
    if (dto.currency === 'GHS') {
      recipientType = 'ghipss';
    } else if (dto.currency === 'ZAR') {
      recipientType = 'basa';
    }

    const recipientResponse = await this.createRecipient(
      recipientType,
      dto.accountName,
      dto.accountNumber,
      dto.bankCode,
      dto.currency,
    );

    const recipientCode = recipientResponse.data.recipient_code;

    return this.initiateTransfer(
      recipientCode,
      dto.amount,
      dto.currency,
      dto.reference,
      dto.reason,
    );
  }

  async transferToMobileMoney(dto: MobileMoneyTransferDto) {
    const recipientResponse = await this.createRecipient(
      'mobile_money',
      dto.accountName,
      dto.accountNumber,
      dto.network.toUpperCase(),
      dto.currency,
    );

    const recipientCode = recipientResponse.data.recipient_code;

    return this.initiateTransfer(
      recipientCode,
      dto.amount,
      dto.currency,
      dto.reference,
      dto.reason,
    );
  }

  async finalizeTransfer(transferCode: string, otp: string) {
    return this.paystackHttp.post('/transfer/finalize_transfer', {
      transfer_code: transferCode,
      otp,
    });
  }

  async resendOtp(transferCode: string, reason: string = 'resend_otp') {
    return this.paystackHttp.post('/transfer/resend_otp', {
      transfer_code: transferCode,
      reason,
    });
  }

  async disableOtpRequest() {
    return this.paystackHttp.post('/transfer/disable_otp', {});
  }

  async disableOtpFinalize(otp: string) {
    return this.paystackHttp.post('/transfer/disable_otp_finalize', { otp });
  }

  async enableOtp() {
    return this.paystackHttp.post('/transfer/enable_otp', {});
  }

  async verifyTransfer(reference: string) {
    return this.paystackHttp.get(`/transfer/verify/${reference}`);
  }
}
