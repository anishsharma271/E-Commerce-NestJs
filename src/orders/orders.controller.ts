import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ResponseInterceptor } from 'src/utils/interceptor/response.interceptor';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Role } from 'src/utils/decorators/roles.decorator';

@Controller('orders')
@UseInterceptors(ResponseInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('place')
  @UseGuards(JwtAuthGuard)
  async placeOrder(@GetUser() user: User) {
    try {
      const result = await this.ordersService.placeOrder(user);
      return { msg: "Order placed successfully" };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }


  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  async getAllOrders() {
    try {
      const result = await this.ordersService.getAllOrders();
      return { msg: "Order fetch  successfully", data: result };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

