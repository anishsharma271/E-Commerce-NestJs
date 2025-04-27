import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, OrderEntity, CartEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
