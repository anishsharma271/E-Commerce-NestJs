import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { User } from 'src/auth/entities/user.entity';
import { productEntity } from 'src/products/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartEntity, User, productEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
