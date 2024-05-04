import { Product } from "src/products/entities/product.entity";
export declare class Category {
    id: number;
    name_cat: string;
    products: Product[];
    created_at: Date;
    updated_at: Date;
}
