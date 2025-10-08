import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('balance')
@UseGuards(ApiKeyGuard)
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  async getBalance(@Query('currency') currency?: string) {
    return this.balanceService.getBalance(currency);
  }
}
