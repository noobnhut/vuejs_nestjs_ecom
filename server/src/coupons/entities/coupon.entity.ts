import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
@Entity({ name: 'coupons' }) // Tên table trên cơ sở dữ liệu
export class Coupon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 10,nullable: false,unique: true})
    coupon_name: string;

    @Column({nullable: false,type:'bigint'})
    coupon_percent: number;

    @Column({nullable: false,type:'bigint'})
    coupon_quantity: number;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}

