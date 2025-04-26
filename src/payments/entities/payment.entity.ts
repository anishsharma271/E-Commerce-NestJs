import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
  } from 'typeorm';
  import { User } from 'src/auth/entities/user.entity'; // Update the path if necessary
  import { OrderEntity } from 'src/orders/entities/order.entity'; // Update the path if necessary
  
  export enum PaymentStatus {
    PENDING = 'pending',
    SUCCESSFUL = 'successful',
    FAILED = 'failed',
    REFUNDED = 'refunded',
  }
  
  @Entity()
  export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, (user) => user.payments)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => OrderEntity, (order) => order.payments)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: string;
  
    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    payment_status: PaymentStatus;
  
    @Column({ nullable: true })
    payment_method: string; // Can be Razorpay, PayPal, etc.
  
    @Column({ nullable: true })
    payment_reference: string; // Razorpay Transaction ID, etc.
  
    @Column({ nullable: true })
    product_id: string; // Can store the related product if it's for a single product.
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    payment_date: Date;
  
    @Column({ default: false })
    is_refunded: boolean;
  }
  