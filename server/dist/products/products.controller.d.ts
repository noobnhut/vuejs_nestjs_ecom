import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<"Đã tồn tại tên sản phẩm này" | (CreateProductDto & import("./entities/product.entity").Product)>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): Promise<"Đã tồn tại tên sản phẩm này" | "Đã cập nhật" | "Không tìm thấy sản phẩm">;
    remove(id: string): string;
}
