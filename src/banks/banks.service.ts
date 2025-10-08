import { Injectable } from '@nestjs/common';
import { PaystackHttpService } from '../shared/paystack-http.service';

@Injectable()
export class BanksService {
  constructor(private paystackHttp: PaystackHttpService) {}

  async listBanks(queryParams?: Record<string, any>) {
    let endpoint = '/bank';

    if (queryParams && Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams(queryParams).toString();
      endpoint += `?${params}`;
    }

    return this.paystackHttp.get(endpoint);
  }

  async resolveAccount(accountNumber: string, bankCode: string) {
    const params = new URLSearchParams({
      account_number: accountNumber,
      bank_code: bankCode,
    });

    return this.paystackHttp.get(`/bank/resolve?${params.toString()}`);
  }
}
