import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { ProductsService } from 'src/products/products.service';
export declare class OrderDetailsService {
    private orderDetailRepository;
    private productService;
    constructor(orderDetailRepository: Repository<OrderDetail>, productService: ProductsService);
    create(createOrderDetailDto: CreateOrderDetailDto, id: number): Promise<CreateOrderDetailDto & OrderDetail>;
    creates(single_price: number, quantity: number, id: number, orders: any): Promise<{
        product: import("../products/entities/product.entity").Product;
        single_price: number;
        quantity: number;
        order: any;
    } & OrderDetail>;
    remove(id: number): string;
}
