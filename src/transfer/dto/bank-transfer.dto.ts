import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class BankTransferDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsString()
  bankCode: string;

  @IsString()
  accountName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  @IsOptional()
  reference?: string;
}
