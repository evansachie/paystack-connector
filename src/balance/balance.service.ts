import { Injectable } from '@nestjs/common';
import { PaystackHttpService } from '../shared/paystack-http.service';

@Injectable()
export class BalanceService {
  constructor(private paystackHttp: PaystackHttpService) {}

  async getBalance(currency?: string) {
    let endpoint = '/balance';

    if (currency) {
      endpoint += `?currency=${currency}`;
    }

    return this.paystackHttp.get(endpoint);
  }
}
