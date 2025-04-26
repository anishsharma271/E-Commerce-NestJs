import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';  // adjust the path
import { productEntity } from 'src/products/entities/product.entity'; // adjust the path

@Entity({ name: 'cart' })
export class CartEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.carts, { eager: true })
    user: User;

    @ManyToOne(() => productEntity, { eager: true })
    product: productEntity;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
