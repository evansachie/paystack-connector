import { Injectable } from '@nestjs/common';
import { PaystackHttpService } from '../shared/paystack-http.service';

@Injectable()
export class TransactionService {
  constructor(private paystackHttp: PaystackHttpService) {}

  async verifyTransaction(reference: string) {
    return this.paystackHttp.get(`/transaction/verify/${reference}`);
  }
}
