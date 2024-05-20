import { Favourite } from "src/favourites/entities/favourite.entity";
import { Order } from "src/orders/entities/order.entity";
export declare enum Role {
    User = "user",
    Admin = "admin"
}
export declare class User {
    id: number;
    fullname: string;
    email: string;
    password: string;
    numberphone: string;
    address: string;
    refresh_token: string;
    role: Role;
    favourites: Favourite[];
    orders: Order[];
    created_at: Date;
    updated_at: Date;
}
