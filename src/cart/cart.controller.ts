import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UseGuards, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { ResponseInterceptor } from 'src/utils/interceptor/response.interceptor';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('cart')
@UseInterceptors(ResponseInterceptor)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    try {
      const result = await this.cartService.addToCart(addToCartDto);
      return { msg: "Product added to cart successfully!" };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }

  @Get('my-cart')
  @UseGuards(JwtAuthGuard)
  async getMyCart(@GetUser() user: User) {
  
    try {
      const result = await this.cartService.getCartByUser(user.id);;
      return { msg: "Cart fetched successfully!", data:result };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }

}


