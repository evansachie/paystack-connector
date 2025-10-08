import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { BanksService } from './banks.service';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { ResolveAccountDto } from './dto/resolve-account.dto';

@Controller('banks')
@UseGuards(ApiKeyGuard)
export class BanksController {
  constructor(private banksService: BanksService) {}

  @Get('list')
  async listBanks(@Query() queryParams: Record<string, any>) {
    return this.banksService.listBanks(queryParams);
  }

  @Post('resolve')
  async resolveAccount(@Body() dto: ResolveAccountDto) {
    return this.banksService.resolveAccount(dto.accountNumber, dto.bankCode);
  }
}
