import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
@Entity({ name: 'favouriters' }) // Tên table trên cơ sở dữ liệu
export class Favourite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    status: boolean;

    @ManyToOne(() => Product, (Product) => Product.favourites)
    product: Product

    @ManyToOne(() => User, (User) => User.favourites)
    user: User
}
