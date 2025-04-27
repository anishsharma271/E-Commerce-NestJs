import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { OrderEntity, OrderStatus, PaymentStatus } from 'src/orders/entities/order.entity';

@Injectable()
export class PaymentsService {

  constructor(


    @InjectRepository(User)
    private readonly userRepository: Repository<User>,


    @InjectRepository(OrderEntity)
    private readonly OrderRepository: Repository<OrderEntity>,


  ) { }
  async createPayment(user: User, orderId: string) {
    const order = await this.OrderRepository.findOne({
      where: { id: orderId, user: { id: user.id } },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Order is already paid or cancelled.');
    }

    // // --- Here you call your Payment Gateway (eg. Razorpay, Stripe) ---
    // here we can use the payment gateway for create the payment order 
    // razorpay , Payu , stripe etc
  }


  async verifyPayment(user: User, verifyDto: any) {
    const { paymentId, orderId, signature } = verifyDto;

    //  verify the payment after done by user we will place this api webhook in payment gateway webhook 
    // it automatically trigger when user done payment through this we will update the success payment in our db 

    const order = await this.OrderRepository.findOne({
      where: { id: orderId, user: { id: user.id } },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    order.status = OrderStatus.CONFIRMED
    order.paymentStatus = PaymentStatus.PAID
    await this.OrderRepository.save(order);

    return { message: 'Payment verified and order confirmed successfully!' };
  }


  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
