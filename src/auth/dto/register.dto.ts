import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export class RegisterDto {

    @ApiProperty({
        description: 'The email of the user',
        type: String,
        example: 'user@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The name of the user',
        type: String,
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The role of the user',
        enum: UserRole,
        example: UserRole.USER,
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(UserRole, { message: 'Role must be either admin or user' })
    role: UserRole;

    @ApiProperty({
        description: 'The age of the user',
        type: Number,
        example: 25,
    })
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @ApiProperty({
        description: 'The password of the user',
        type: String,
        example: 'password123',
        minLength: 6,
        maxLength: 12,
    })
    @MinLength(6)
    @MaxLength(12)
    @IsString()
    @IsNotEmpty()
    password: string;
}
