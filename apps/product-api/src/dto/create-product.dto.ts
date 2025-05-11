import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Premium Chair',
    description: 'The name of the product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Ergonomic office chair with lumbar support',
    description: 'A short description of the product',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 750000,
    description: 'The price of the product in IDR (Indonesian Rupiah)',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
