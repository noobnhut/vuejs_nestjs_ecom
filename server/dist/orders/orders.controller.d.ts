import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(id: number, createOrderDto: CreateOrderDto, carts: any): Promise<"Tạo thất bại" | {
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
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: number): Promise<import("./entities/order.entity").Order>;
    update(id: number, updateOrderDto: UpdateOrderDto, check_create: string): Promise<"Thanh toán thành công" | "Đơn hàng đã thanh toán" | "Không tồn tại hóa đơn hoặc đã thanh toán thành công">;
    remove(id: number, check: string): Promise<"Xong" | "Hủy thành công" | "Đơn hàng không thể hủy,vui lòng liên hệ CSKH">;
    change(id: number): Promise<"Không tồn tại hóa đơn" | "Cập nhập đang giao hàng" | "Cập nhập đã giao hàng" | "Không tồn tại">;
}
