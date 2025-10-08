import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { BankTransferDto } from './dto/bank-transfer.dto';
import { MobileMoneyTransferDto } from './dto/mobile-money-transfer.dto';
import {
  FinalizeTransferDto,
  ResendOtpDto,
  DisableOtpFinalizeDto,
} from './dto/otp.dto';

@Controller('transfer')
@UseGuards(ApiKeyGuard)
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Post('bank')
  async transferToBank(@Body() dto: BankTransferDto) {
    return this.transferService.transferToBank(dto);
  }

  @Post('mobile-money')
  async transferToMobileMoney(@Body() dto: MobileMoneyTransferDto) {
    return this.transferService.transferToMobileMoney(dto);
  }

  @Post('finalize')
  async finalizeTransfer(@Body() dto: FinalizeTransferDto) {
    return this.transferService.finalizeTransfer(dto.transfer_code, dto.otp);
  }

  @Post('resend-otp')
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.transferService.resendOtp(dto.transfer_code, dto.reason);
  }

  @Post('disable-otp-request')
  async disableOtpRequest() {
    return this.transferService.disableOtpRequest();
  }

  @Post('disable-otp-finalize')
  async disableOtpFinalize(@Body() dto: DisableOtpFinalizeDto) {
    return this.transferService.disableOtpFinalize(dto.otp);
  }

  @Post('enable-otp')
  async enableOtp() {
    return this.transferService.enableOtp();
  }
}
