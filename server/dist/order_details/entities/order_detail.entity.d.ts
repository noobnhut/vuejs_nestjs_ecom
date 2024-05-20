import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
export declare class OrderDetail {
    id: number;
    single_price: number;
    quantity: number;
    order: Order;
    product: Product;
    created_at: Date;
}
