import { ImgProductsService } from './img_products.service';
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';
export declare class ImgProductsController {
    private readonly imgProductsService;
    constructor(imgProductsService: ImgProductsService);
    create(createImgProductDto: CreateImgProductDto): Promise<void>;
    findAll(): Promise<import("./entities/img_product.entity").ImgProduct[]>;
    findOne(id: string): string;
    update(id: string, updateImgProductDto: UpdateImgProductDto): Promise<void>;
    remove(id: string): string;
}
