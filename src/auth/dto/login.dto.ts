import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'password123',
    minLength: 6,
    maxLength: 12,
  })
  @MinLength(6)
  @MaxLength(12)
  @IsNotEmpty()
  password: string;
}
