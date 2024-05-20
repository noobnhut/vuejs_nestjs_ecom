import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, id: number): Promise<"Đã tồn tại tên sản phẩm này" | "Thêm thành công" | "không tồn tại cat">;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findName(name: string, page: number, limit: number): Promise<{
        products: import("./entities/product.entity").Product[];
        total: number;
        currentPage: number;
        perPage: number;
        lastPage: number;
    }>;
    findOne(id: number): Promise<import("./entities/product.entity").Product>;
    findByCat(catId: number, page: number, limit: number): Promise<{
        products: import("./entities/product.entity").Product[];
        total: number;
        currentPage: number;
        perPage: number;
        lastPage: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<"Đã tồn tại tên sản phẩm này" | "Đã cập nhật" | "Không tìm thấy sản phẩm">;
    remove(id: number): Promise<"Không tìm thấy sản phẩm" | "Thao tác thành công">;
}
