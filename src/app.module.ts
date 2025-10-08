import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import paystackConfig from './config/paystack.config';
import { SharedModule } from './shared/shared.module';
import { ChargeModule } from './charge/charge.module';
import { TransferModule } from './transfer/transfer.module';
import { BanksModule } from './banks/banks.module';
import { BalanceModule } from './balance/balance.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [paystackConfig],
    }),
    SharedModule,
    ChargeModule,
    TransferModule,
    BanksModule,
    BalanceModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
