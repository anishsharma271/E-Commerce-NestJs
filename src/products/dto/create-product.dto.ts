import { IsString, IsNumber, IsOptional, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDecimal()
    price: string;

    @IsNotEmpty()
    @IsNumber()
    stock: number;
}
