"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const img_product_entity_1 = require("./entities/img_product.entity");
const cloudinary_1 = require("cloudinary");
const streamifier = require('streamifier');
const products_service_1 = require("../products/products.service");
let ImgProductsService = class ImgProductsService {
    constructor(imgProductRepository, productsService) {
        this.imgProductRepository = imgProductRepository;
        this.productsService = productsService;
    }
    uploadFile(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    async create(createImgProductDto, file, id) {
        try {
            const add_img = await this.uploadFile(file);
            const product = await this.productsService.findOne(id);
            if (product) {
                createImgProductDto.img_public_key = add_img.public_id;
                createImgProductDto.img_url = add_img.url;
                createImgProductDto.product = product;
                const result = this.imgProductRepository.create(createImgProductDto);
                return this.imgProductRepository.save(result);
            }
            else {
                return { message: 'Không tồn tại sản phẩm' };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    findOne(id) {
        try {
            return this.imgProductRepository.findOneBy({ id });
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(id) {
        try {
            const check_img = await this.imgProductRepository.findOneBy({ id: id });
            if (check_img) {
                cloudinary_1.v2.api
                    .delete_resources([check_img.img_public_key], { type: 'upload', resource_type: 'image' })
                    .then(console.log);
                await this.imgProductRepository.delete(check_img);
                return { message: 'Xóa thành công rùi nè' };
            }
            else {
                return { message: 'Không tồn tại ảnh này' };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    findByProduct(id) {
        return this.imgProductRepository.find({
            relations: ['product'],
            where: { product: { id: id } }
        });
    }
};
exports.ImgProductsService = ImgProductsService;
exports.ImgProductsService = ImgProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(img_product_entity_1.ImgProduct)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], ImgProductsService);
//# sourceMappingURL=img_products.service.js.map