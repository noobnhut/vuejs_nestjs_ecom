import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";

@Entity({ name: 'reviews' }) // Tên table trên cơ sở dữ liệu
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false,length:64})
    content: string;

    @ManyToOne(() => Product, (Product) => Product.reviews)
    product: Product

    @ManyToOne(() => User, (User) => User.reviews)
    user: User
}
