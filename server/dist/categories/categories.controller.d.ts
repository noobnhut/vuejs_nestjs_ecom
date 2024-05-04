import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<"Đã tồn tại tên cat này" | ({
        name_cat: string;
    } & import("./entities/category.entity").Category)>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): string;
    update(id: string, updateCategoryDto: UpdateCategoryDto): void;
    remove(id: string): string;
}
