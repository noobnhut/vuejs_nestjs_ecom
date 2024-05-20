import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<"Đã tồn tại tên cat này" | "Đã thêm thành công">;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findAllWithProduct(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: number): Promise<import("./entities/category.entity").Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<"Đã cập nhật" | "Đã tồn tại tên cat này" | {
        message: string;
        statusCode: number;
    }>;
    remove(id: number): Promise<"Không thể xóa vì cat này chứ product" | "Xóa thành công" | "khong ton tai">;
}
