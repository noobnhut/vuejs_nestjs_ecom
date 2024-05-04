import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
export declare class Review {
    id: number;
    content: string;
    product: Product;
    user: User;
}
