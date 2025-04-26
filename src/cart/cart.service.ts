import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { productEntity } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(productEntity)
    private readonly productRepository: Repository<productEntity>,
  ) { }
  async addToCart(addToCartDto: AddToCartDto) {

    const { userId, productId, quantity } = addToCartDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });


    const cartItem = this.cartRepository.create({
      user,
      product,
      quantity,
    });

    const savedCart = await this.cartRepository.save(cartItem);

    return savedCart
  }

  async getCartByUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cartItems = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    return cartItems
  }



  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
