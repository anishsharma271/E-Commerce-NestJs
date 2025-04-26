import { IsUUID, IsInt, Min, IsNotEmpty } from 'class-validator';

export class AddToCartDto {

    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;
}
