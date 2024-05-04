import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
export declare class OrderDetailsController {
    private readonly orderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    create(createOrderDetailDto: CreateOrderDetailDto): Promise<CreateOrderDetailDto & import("./entities/order_detail.entity").OrderDetail>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): string;
    remove(id: string): string;
}
