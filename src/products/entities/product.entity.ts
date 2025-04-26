import { CartEntity } from 'src/cart/entities/cart.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({
    name: 'products',
})
export class productEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column({ type: String, nullable: true })
    name: string;

    @Column({ type: String, nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: string;

    @Column({ type: Number, nullable: false, default: 0 })
    total_sales: Number;

    @Column({ type: 'int', nullable: false, default: 0 })
    stock: number;

    @OneToMany(() => CartEntity, (cart) => cart.product)
    carts: CartEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;



}
