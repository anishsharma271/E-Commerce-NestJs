import { Controller, Post, Body, UseInterceptors, InternalServerErrorException, BadRequestException, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto, UserRole } from './dto/register.dto';
import { ResponseInterceptor } from 'src/utils/interceptor/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/utils/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private authService: AuthService) { }

  private handleError(err: any) {
    if (err?.message === 'JWT_SECRET is not defined in the environment variables!') {
      throw new NotFoundException('JWT_SECRET is not defined in the environment variables!');
    }
    if (err?.message === 'Invalid credentials') {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (err?.message === 'Email already in use') {
      throw new BadRequestException('Email already in use');
    }
    // if (err? === 'Unknown authentication strategy "jwt"') {
    //   throw new BadRequestException('Email already in use');
    // }
    throw new InternalServerErrorException(err.message || 'Something went wrong');
  }


  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      dto = { ...dto, role: UserRole.USER };
      const result = await this.authService.register(dto);
      return { msg: "user register successfully ", data: result };
    } catch (err) {
      this.handleError(err);
    }

  }



  @Post('register-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  async registerAdmin(@Body() dto: RegisterDto) {

    try {

      // dto = { ...dto, role: UserRole.ADMIN };
      const result = await this.authService.register(dto);
      return { msg: 'User registered successfully', data: result };
    } catch (err) {
      console.error("Error in registerAdmin:", err);
      this.handleError(err);
    }
  }


  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.authService.login(dto);
      return { msg: "user logIn successfully ", data: result };
    } catch (err) {
      this.handleError(err);
    }

  }
}
