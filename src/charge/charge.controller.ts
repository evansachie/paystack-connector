import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeMobileMoneyDto } from './dto/charge-mobile-money.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('charge')
@UseGuards(ApiKeyGuard)
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Post('mobile-money')
  chargeMobileMoney(@Body() dto: ChargeMobileMoneyDto) {
    return this.chargeService.chargeMobileMoney(dto);
  }

  @Post('submit-otp')
  submitOtp(@Body() body: { reference: string; otp: string }) {
    return this.chargeService.submitOtp(body.reference, body.otp);
  }
}
