import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private catRepository;
    constructor(catRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<"Đã tồn tại tên cat này" | (CreateCategoryDto & Category)>;
    findAll(): Promise<Category[]>;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<"Đã tồn tại tên cat này" | "Đã cập nhật" | "Không tìm thấy cat">;
    remove(id: number): Promise<"Xóa danh mục thành công" | "không tìm thấy danh mục">;
}
