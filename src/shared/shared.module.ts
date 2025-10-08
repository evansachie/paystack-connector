import { Module, Global } from '@nestjs/common';
import { PaystackHttpService } from './paystack-http.service';

@Global()
@Module({
  providers: [PaystackHttpService],
  exports: [PaystackHttpService],
})
export class SharedModule {}
