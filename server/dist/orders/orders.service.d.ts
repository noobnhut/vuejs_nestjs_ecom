import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { MailService } from 'src/mail/mail.service';
export declare class OrdersService {
    private orderRepository;
    private userService;
    private configService;
    private orderDetailService;
    private mailService;
    constructor(orderRepository: Repository<Order>, userService: UsersService, configService: ConfigService, orderDetailService: OrderDetailsService, mailService: MailService);
    create(createOrderDto: CreateOrderDto, id: number, carts: any): Promise<"Tạo thất bại" | {
        order: never;
    }>;
    createVNP(createOrderDto: CreateOrderDto, id: number, req: any, bank: string, carts: any): Promise<"Thất bại" | {
        redirectUrl: string;
        order: never;
        check_create: boolean;
    }>;
    getVNP(query: any): Promise<{
        code: any;
    }>;
    sortObject(obj: any): {};
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto, check_create: string): Promise<"Thanh toán thành công" | "Đơn hàng đã thanh toán" | "Không tồn tại hóa đơn hoặc đã thanh toán thành công">;
    remove(id: number, check: string): Promise<"Xong" | "Hủy thành công" | "Đơn hàng không thể hủy,vui lòng liên hệ CSKH">;
    updateOrderStatus(id: number): Promise<"Không tồn tại hóa đơn" | "Cập nhập đang giao hàng" | "Cập nhập đã giao hàng" | "Không tồn tại">;
}
export declare enum OrderStatus {
    DaGiaoHang = "\u0110\u00E3 giao h\u00E0ng",
    DaDat = "\u0110\u00E3 \u0111\u1EB7t",
    DaThanhToan = "\u0110\u00E3 thanh to\u00E1n",
    DangGiao = "\u0110ang giao h\u00E0ng",
    DaHuy = "\u0110\u00E3 h\u1EE7y",
    ThatBai = "Thanh to\u00E1n th\u1EA5t b\u1EA1i"
}
