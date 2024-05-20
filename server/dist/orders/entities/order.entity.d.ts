import { OrderDetail } from "src/order_details/entities/order_detail.entity";
import { User } from "src/users/entities/user.entity";
export declare enum OrderStatus {
    DaGiaoHang = "\u0110\u00E3 giao h\u00E0ng",
    DaDat = "\u0110\u00E3 \u0111\u1EB7t",
    DaThanhToan = "\u0110\u00E3 thanh to\u00E1n",
    DangGiao = "\u0110ang giao h\u00E0ng",
    DaHuy = "\u0110\u00E3 h\u1EE7y",
    ThatBai = "Thanh to\u00E1n th\u1EA5t b\u1EA1i"
}
export declare enum Payment {
    COD = "COD",
    VNPAY = "VNPAY"
}
export declare class Order {
    id: number;
    total_order: number;
    total_coupon: number;
    vnp_orderID: number;
    total_bank: number;
    date_bank: Date;
    status: OrderStatus;
    payment: Payment;
    user: User;
    ods: OrderDetail[];
    created_at: Date;
    updated_at: Date;
}
