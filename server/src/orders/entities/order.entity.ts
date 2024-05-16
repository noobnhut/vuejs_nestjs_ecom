import { OrderDetail } from "src/order_details/entities/order_detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum OrderStatus {
    DaGiaoHang = "Đã giao hàng",
    DaDat = "Đã đặt",
    DaThanhToan = "Đã thanh toán",
    DangGiao = "Đang giao hàng",
    DaHuy = "Đã hủy",
    ThatBai = "Thanh toán thất bại"
}

export enum Payment {
    COD = "COD",
    VNPAY = "VNPAY",
}

@Entity({ name: 'orders' }) // Tên table trên cơ sở dữ liệu
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false,type:'double'})
    total_order:number

    @Column({nullable:false,type:'double'})
    total_coupon:number

    @Column({nullable: true,type:'double'})
    vnp_orderID:number

    @Column({nullable: true,type:'double'})
    total_bank:number

    @Column({  type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_bank: Date;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.DaDat,
    })
    status: OrderStatus;

    @Column({
        type: "enum",
        enum: Payment,
        default: Payment.COD,
    })
    payment: Payment;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderDetail, OrderDetail => OrderDetail.order)
    ods: OrderDetail[];

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
