import { IsEmail, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class InitializeTransactionDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(100)
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string = 'GHS';

  @IsString()
  @IsOptional()
  callbackUrl?: string;
}
