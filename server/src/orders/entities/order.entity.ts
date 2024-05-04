import { OrderDetail } from "src/order_details/entities/order_detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum OrderStatus {
    DaGiaoHang = "Đã giao hàng",
    DaDat = "Đã đặt",
    DaThanhToan = "Đã thanh toán",
    DangGiao = "Đang giao hàng",
    DaHuy = "Đã hủy",
}
@Entity({ name: 'orders' }) // Tên table trên cơ sở dữ liệu
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false,type:'double'})
    total_order:number

    @Column({nullable:false,type:'double'})
    total_coupon:number

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.DaDat,
    })
    status: OrderStatus;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderDetail, OrderDetail => OrderDetail.order)
    ods: OrderDetail[];

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
