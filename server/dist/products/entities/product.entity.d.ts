import { Category } from "src/categories/entities/category.entity";
import { Favourite } from "src/favourites/entities/favourite.entity";
import { ImgProduct } from "src/img_products/entities/img_product.entity";
import { OrderDetail } from "src/order_details/entities/order_detail.entity";
import { Review } from "src/reviews/entities/review.entity";
export declare class Product {
    id: number;
    name_product: string;
    des_product: string;
    price: number;
    cat: Category;
    imgs: ImgProduct[];
    favourites: Favourite[];
    reviews: Review[];
    order_details: OrderDetail[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    is_deleted: Boolean;
}
