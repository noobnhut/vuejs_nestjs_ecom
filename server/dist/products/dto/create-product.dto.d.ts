import { Category } from 'src/categories/entities/category.entity';
export declare class CreateProductDto {
    name_product: string;
    des_product: string;
    price: number;
    cat: Category;
    quantity: number;
    out_quantity: number;
}
