import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProductDto {

    @ApiProperty({ description: 'The name of the product' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The description of the product', required: false })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'The price of the product' })
    @IsNotEmpty()
    @IsDecimal()
    price: string;

    @ApiProperty({ description: 'The stock of the product' })
    @IsNotEmpty()
    @IsNumber()
    stock: number;
}
