import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private catRepository;
    constructor(catRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<"Đã tồn tại tên cat này" | ({
        name_cat: string;
    } & Category)>;
    findAll(): Promise<Category[]>;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): void;
    remove(id: number): string;
}
