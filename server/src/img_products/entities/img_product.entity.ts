import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
@Entity({ name: 'img_products' }) // Tên table trên cơ sở dữ liệu
export class ImgProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    img_url: string;

    @Column({nullable: false})
    img_public_key: string;

    @ManyToOne(() => Product, product => product.imgs)
    product: Product;
    
    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
