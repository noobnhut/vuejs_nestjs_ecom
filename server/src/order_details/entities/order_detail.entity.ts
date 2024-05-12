import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'order_details' }) // Tên table trên cơ sở dữ liệu
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false,type:'double'})
    single_price:number

    @Column({nullable:false,type:'double'})
    quantity:number
    
    @ManyToOne(() => Order, (order) => order.ods)
    order: Order;

    @ManyToOne(() => Product, (product) => product.order_details)
    product: Product;    

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
