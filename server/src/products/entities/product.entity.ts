import { Category } from "src/categories/entities/category.entity";
import { Favourite } from "src/favourites/entities/favourite.entity";
import { ImgProduct } from "src/img_products/entities/img_product.entity";
import { OrderDetail } from "src/order_details/entities/order_detail.entity";
import {  BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'products' }) // Tên table trên cơ sở dữ liệu
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, nullable: false, unique: true })
    name_product: string;

    @Column({ length: 256, nullable: false })
    des_product: string;

    @Column({nullable:false,type:'double'})
    price:number
    
    @Column({nullable:false,type:'double'})
    quantity:number

    @Column({nullable:false,type:'double'})
    real_quantity:number

    @ManyToOne(() => Category, (cat) => cat.products)
    cat: Category

    @OneToMany(() => ImgProduct, imgProduct => imgProduct.product)
    imgs: ImgProduct[];

    @OneToMany(() => Favourite, (favourite) => favourite.product)
    favourites: Favourite[]

    @OneToMany(() => OrderDetail,(orderDetail) => orderDetail.product)
    order_details: OrderDetail[];    

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    deleted_at: Date;

    @Column({ nullable: true })
    is_deleted: Boolean;

    @BeforeInsert()
    setDefaultRealQuantity() {
        // Kiểm tra nếu real_quantity chưa được thiết lập, gán nó bằng quantity
        if (this.real_quantity === undefined || this.real_quantity === null) {
            this.real_quantity = this.quantity;
        }
    }
}

