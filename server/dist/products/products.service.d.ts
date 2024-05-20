import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { ImgProductsService } from 'src/img_products/img_products.service';
export declare class ProductsService {
    private readonly categoriesService;
    private readonly imgProductsService;
    private productoRepository;
    constructor(categoriesService: CategoriesService, imgProductsService: ImgProductsService, productoRepository: Repository<Product>);
    create(createProductDto: CreateProductDto, id: number): Promise<"Đã tồn tại tên sản phẩm này" | "Thêm thành công" | "không tồn tại cat">;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<"Đã tồn tại tên sản phẩm này" | "Đã cập nhật" | "Không tìm thấy sản phẩm">;
    remove(id: number): Promise<"Không tìm thấy sản phẩm" | "Thao tác thành công">;
    findProductByCat(id: number, page?: number, limit?: number, check?: string): Promise<{
        products: Product[];
        total: number;
        currentPage: number;
        perPage: number;
        lastPage: number;
    }>;
    findProductByName(name: string, page?: number, limit?: number, check?: string): Promise<{
        products: Product[];
        total: number;
        currentPage: number;
        perPage: number;
        lastPage: number;
    }>;
    updateQuantity(id: number, quantity: number): Promise<void>;
}
