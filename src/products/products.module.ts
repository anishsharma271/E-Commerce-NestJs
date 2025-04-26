import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productEntity } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([productEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
