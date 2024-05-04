import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order_detail.entity';
export declare class OrderDetailsService {
    private orderDetailRepository;
    constructor(orderDetailRepository: Repository<OrderDetail>);
    create(createOrderDetailDto: CreateOrderDetailDto): Promise<CreateOrderDetailDto & OrderDetail>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderDetailDto: UpdateOrderDetailDto): string;
    remove(id: number): string;
}
