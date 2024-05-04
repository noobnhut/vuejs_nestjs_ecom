import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private productoRepository;
    constructor(productoRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<"Đã tồn tại tên sản phẩm này" | (CreateProductDto & Product)>;
    findAll(): Promise<Product[]>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): Promise<"Đã tồn tại tên sản phẩm này" | "Đã cập nhật" | "Không tìm thấy sản phẩm">;
    remove(id: number): string;
}
