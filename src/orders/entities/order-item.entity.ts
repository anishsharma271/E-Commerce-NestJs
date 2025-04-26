import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { OrderEntity } from './order.entity';
import { productEntity } from 'src/products/entities/product.entity';

@Entity({ name: 'order_items' })
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => OrderEntity, (order) => order.orderItems)
    order: OrderEntity;

    @ManyToOne(() => productEntity)
    product: productEntity;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ default: false })
    isRefunded: boolean;
}
