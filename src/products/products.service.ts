import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { productEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(productEntity)
    private productRepository: Repository<productEntity>,
  ) { }
  async createProduct(createProductDto: CreateProductDto): Promise<productEntity> {
    const { name, description, price, stock } = createProductDto;

    const existingProduct = await this.productRepository.findOne({ where: { name } });
    if (existingProduct) {
      throw new Error('Product with this name already exists.');
    }

    const newProduct = this.productRepository.create({
      name,
      description,
      price,
      stock,
    });

    return this.productRepository.save(newProduct);
  }
  async getAllProducts({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const take = limit;

    const [products, total] = await this.productRepository.findAndCount({
      skip,
      take,
    });

    return {
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
