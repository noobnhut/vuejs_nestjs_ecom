import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private productoRepository;
    constructor(productoRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<string>;
    findAll(): Promise<Product[]>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
