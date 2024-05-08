import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<"Đã tồn tại tên cat này" | (CreateCategoryDto & import("./entities/category.entity").Category)>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): string;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<"Đã tồn tại tên cat này" | "Đã cập nhật" | "Không tìm thấy cat">;
    remove(id: string): Promise<"Xóa danh mục thành công" | "không tìm thấy danh mục">;
}
