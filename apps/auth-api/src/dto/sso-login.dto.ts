import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SsoLoginDto {
  @ApiProperty({ example: 'google', enum: ['google', 'facebook'] })
  @IsIn(['google', 'facebook'])
  provider: string;

  @ApiProperty({ example: 'ya29.A0ARrdaM...SSO_ID_TOKEN' })
  @IsString()
  token: string;
}
