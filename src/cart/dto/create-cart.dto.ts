import { IsUUID, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {

    @ApiProperty({
        description: 'The unique identifier of the user',
        type: String,
        example: 'f2e9c0d4-2b09-4f5f-a1db-2a5b7b7b0e72',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: 'The unique identifier of the product',
        type: String,
        example: 'd2b18d33-e1bf-4329-8c97-bd2f7a5c327f',
    })
    @IsNotEmpty()
    @IsUUID()
    productId: string;

    @ApiProperty({
        description: 'The quantity of the product to add to the cart',
        type: Number,
        example: 2,
        minimum: 1,
    })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;
}
