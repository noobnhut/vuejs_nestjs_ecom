import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
export enum Payment {
    COD = "COD",
    VNPAY = "VNPAY",
}
export enum OrderStatus {
    DaGiaoHang = "Đã giao hàng",
    DaDat = "Đã đặt",
    DaThanhToan = "Đã thanh toán",
    DangGiao = "Đang giao hàng",
    DaHuy = "Đã hủy",
}
export class CreateOrderDto {
    @IsNotEmpty({ message: 'Không được để trống', })
    total_order: number;

    total_coupon: number

    user:User

    payment:Payment

    status:OrderStatus

    vnp_orderID:number

    total_bank:number

    date_bank:Date
}
