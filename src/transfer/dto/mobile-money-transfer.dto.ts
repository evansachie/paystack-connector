import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class MobileMoneyTransferDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsString()
  network: string; // "mtn", "vod", etc

  @IsString()
  accountName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  @IsOptional()
  reference?: string;
}
