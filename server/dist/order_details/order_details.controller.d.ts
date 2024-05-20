import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
export declare class OrderDetailsController {
    private readonly orderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    create(createOrderDetailDto: CreateOrderDetailDto, id: number): Promise<CreateOrderDetailDto & import("./entities/order_detail.entity").OrderDetail>;
    remove(id: number): string;
}
