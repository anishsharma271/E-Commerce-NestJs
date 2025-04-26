import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {

  @IsNotEmpty() 
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @MaxLength(12)
  @IsNotEmpty() 
  password: string;
}
