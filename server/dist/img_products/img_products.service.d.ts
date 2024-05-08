import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';
import { Repository } from 'typeorm';
import { ImgProduct } from './entities/img_product.entity';
export declare class ImgProductsService {
    private imgProductRepository;
    constructor(imgProductRepository: Repository<ImgProduct>);
    create(createImgProductDto: CreateImgProductDto): Promise<void>;
    findAll(): Promise<ImgProduct[]>;
    findOne(id: number): string;
    update(id: number, updateImgProductDto: UpdateImgProductDto): Promise<void>;
    remove(id: number): string;
}
