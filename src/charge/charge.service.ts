import { Injectable } from '@nestjs/common';
import { PaystackHttpService } from '../shared/paystack-http.service';
import { ChargeMobileMoneyDto } from './dto/charge-mobile-money.dto';

@Injectable()
export class ChargeService {
  constructor(private paystackHttp: PaystackHttpService) {}

  async chargeMobileMoney(dto: ChargeMobileMoneyDto) {
    const payload: any = {
      email: dto.email,
      amount: dto.amount,
      currency: dto.currency,
      mobile_money: {
        phone: dto.phone,
        provider: dto.provider,
      },
    };

    if (dto.reference) {
      payload.reference = dto.reference;
    }

    return this.paystackHttp.post('/charge', payload);
  }

  async submitOtp(reference: string, otp: string) {
    return this.paystackHttp.post('/charge/submit_otp', {
      reference,
      otp,
    });
  }
}
