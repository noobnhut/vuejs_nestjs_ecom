import { Favourite } from "src/favourites/entities/favourite.entity";
import { Order } from "src/orders/entities/order.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
/*
length: ?: Định nghĩa độ dài tối đa của chuỗi (tối đa ?0 ký tự)
nullable: false: Bắt buộc trường này không được null.
unique: true: Yêu cầu giá trị của trường này là duy nhất
type: 'timestamp': Định nghĩa kiểu dữ liệu của trường này là timestamp.
default: () => 'CURRENT_TIMESTAMP': Thiết lập mặc định cho trường này là giá trị thời điểm hiện tại khi một bản ghi được tạo
*/
export enum Role {
    User = "user",
    Admin = "admin",
}

@Entity({ name: 'users' }) // Tên table trên cơ sở dữ liệu
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, nullable: false })
    fullname: string;

    @Column({ length: 64, nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    numberphone: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    refresh_token: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.User,
    })
    role:Role
    
    @OneToMany(() => Favourite, (favourite) => favourite.user)
    favourites: Favourite[]

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
    
    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}

