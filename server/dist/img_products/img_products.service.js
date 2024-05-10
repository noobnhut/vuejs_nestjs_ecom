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
let ImgProductsService = class ImgProductsService {
    constructor(imgProductRepository) {
        this.imgProductRepository = imgProductRepository;
    }
    async create(createImgProductDto) {
        try {
            await this.imgProductRepository.save(createImgProductDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.imgProductRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} imgProduct`;
    }
    async update(id, updateImgProductDto) {
        try {
            await this.imgProductRepository.update(id, updateImgProductDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    remove(id) {
        return `This action removes a #${id} imgProduct`;
    }
};
exports.ImgProductsService = ImgProductsService;
exports.ImgProductsService = ImgProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(img_product_entity_1.ImgProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ImgProductsService);
//# sourceMappingURL=img_products.service.js.map