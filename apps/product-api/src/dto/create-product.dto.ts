import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Fresh Tuna',
    description: 'The name of the seafood product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Premium-grade tuna caught in the Pacific Ocean',
    description: 'A short description of the seafood product',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 120000,
    description: 'The price of the seafood product in IDR (Indonesian Rupiah)',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
