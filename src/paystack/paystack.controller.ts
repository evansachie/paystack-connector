import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  initializeTransaction(@Body() dto: InitializeTransactionDto) {
    return this.paystackService.initializeTransaction(dto);
  }

  @Get('verify/:reference')
  verifyTransaction(@Param('reference') reference: string) {
    return this.paystackService.verifyTransaction(reference);
  }

  @Get('transactions')
  getAllTransactions() {
    return this.paystackService.getAllTransactions();
  }

  @Get('transactions/customer/:customerId')
  getCustomerTransactions(@Param('customerId') customerId: string) {
    return this.paystackService.getTransactionsByCustomer(customerId);
  }
}
