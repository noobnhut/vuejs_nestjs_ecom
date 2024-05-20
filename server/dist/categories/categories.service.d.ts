import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ProductsService } from 'src/products/products.service';
export declare class CategoriesService {
    private productService;
    private catRepository;
    constructor(productService: ProductsService, catRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<"Đã tồn tại tên cat này" | "Đã thêm thành công">;
    findAll(): Promise<Category[]>;
    findCategoriesWithProducts(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<"Đã cập nhật" | "Đã tồn tại tên cat này" | {
        message: string;
        statusCode: number;
    }>;
    remove(id: number): Promise<"Không thể xóa vì cat này chứ product" | "Xóa thành công" | "khong ton tai">;
}
