import { IsEmail, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class ChargeMobileMoneyDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsEmail()
  email: string;

  @IsString()
  currency: string;

  @IsString()
  phone: string;

  @IsString()
  provider: string; // "mtn", "vod", etc.

  @IsString()
  @IsOptional()
  reference?: string;
}
