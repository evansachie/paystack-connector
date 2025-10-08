import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('transaction')
@UseGuards(ApiKeyGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('verify/:reference')
  async verifyTransaction(@Param('reference') reference: string) {
    return this.transactionService.verifyTransaction(reference);
  }
}
