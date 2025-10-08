import { IsString } from 'class-validator';

export class FinalizeTransferDto {
  @IsString()
  transfer_code: string;

  @IsString()
  otp: string;
}

export class ResendOtpDto {
  @IsString()
  transfer_code: string;

  @IsString()
  reason: string;
}

export class DisableOtpFinalizeDto {
  @IsString()
  otp: string;
}
