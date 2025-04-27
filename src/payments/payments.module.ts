import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, OrderEntity, User])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule { }
