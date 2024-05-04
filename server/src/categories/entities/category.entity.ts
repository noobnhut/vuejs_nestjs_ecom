import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'categories' }) // Tên table trên cơ sở dữ liệu
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, nullable: false, unique: true })
    name_cat: string;

    @OneToMany(() => Product, (product) => product.cat)
    products: Product[]
    
    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}

