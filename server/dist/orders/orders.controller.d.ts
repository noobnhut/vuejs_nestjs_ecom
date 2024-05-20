import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(id: number, createOrderDto: CreateOrderDto, carts: any): Promise<"Mua hàng thành công" | "Tạo thất bại">;
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
    update(id: number, updateOrderDto: UpdateOrderDto, check_create: Boolean): Promise<"xong" | "Không tồn tại hóa đơn">;
    remove(id: number): Promise<string>;
}
