import { Controller, Post, Body, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResponseInterceptor } from 'src/utils/interceptor/response.interceptor';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const result = await this.authService.register(dto);
      return { msg: "user register successfully " };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.authService.login(dto);
      return { msg: "user logIn successfully ", data: result };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }
}
