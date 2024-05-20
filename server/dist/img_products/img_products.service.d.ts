/// <reference types="multer" />
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { Repository } from 'typeorm';
import { ImgProduct } from './entities/img_product.entity';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
import { ProductsService } from 'src/products/products.service';
export declare class ImgProductsService {
    private imgProductRepository;
    private productsService;
    constructor(imgProductRepository: Repository<ImgProduct>, productsService: ProductsService);
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
    create(createImgProductDto: CreateImgProductDto, file: Express.Multer.File, id: number): Promise<ImgProduct | {
        message: string;
    }>;
    findOne(id: number): Promise<ImgProduct>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findByProduct(id: number): Promise<ImgProduct[]>;
}
