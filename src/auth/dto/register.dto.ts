import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export class RegisterDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsString()
    @IsEnum(UserRole, { message: 'Role must be either admin or user' })
    role: UserRole;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @MinLength(6)
    @MaxLength(12)
    @IsString()
    @IsNotEmpty()
    password: string;
}

// @UseGuards(JwtAuthGuard, RolesGuard)  // JWT + Roles Guard
// @Role('admin')  // Only admin role allowed


// @UseGuards(JwtAuthGuard)  // Only JWT Guard
