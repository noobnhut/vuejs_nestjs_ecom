/// <reference types="multer" />
import { ImgProductsService } from './img_products.service';
import { CreateImgProductDto } from './dto/create-img_product.dto';
export declare class ImgProductsController {
    private readonly imgProductsService;
    constructor(imgProductsService: ImgProductsService);
    create(id: number, createImgProductDto: CreateImgProductDto, file: Express.Multer.File): Promise<import("./entities/img_product.entity").ImgProduct | {
        message: string;
    }>;
    findOne(id: number): Promise<import("./entities/img_product.entity").ImgProduct>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findByProduct(id: number): Promise<import("./entities/img_product.entity").ImgProduct[]>;
}
