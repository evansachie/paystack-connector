import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { PaystackModule } from './paystack/paystack.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import paystackConfig from './config/paystack.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [paystackConfig],
    }),
    PrismaModule,
    CustomersModule,
    PaystackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
