import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(User)
    private readonly OrderItemRepository: Repository<OrderItem>,

    @InjectRepository(OrderEntity)
    private readonly OrderRepository: Repository<OrderEntity>,


  ) { }
  async placeOrder(user: User) {
    const cartItems = await this.cartRepository.find({ where: { user: { id: user.id } }, relations: ['product'] });

    if (!cartItems.length) {
      throw new NotFoundException('Your cart is empty.');
    }

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of cartItems) {
      const orderItem = new OrderItem();
      orderItem.product = item.product;
      orderItem.quantity = item.quantity;
      orderItem.price = Number(item.product.price);
      orderItems.push(orderItem);

      totalAmount += item.quantity * Number(item.product.price);
    }

    const order = new OrderEntity();
    order.user = user;
    order.totalAmount = totalAmount;
    order.orderItems = orderItems;

    const savedOrder = await this.OrderRepository.save(order);

    await this.cartRepository.delete({ user: { id: user.id } });

    return savedOrder
  }

  async getAllOrders() {
    const orders = await this.OrderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.product'],
      order: { createdAt: 'DESC' },
    });

    return orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
