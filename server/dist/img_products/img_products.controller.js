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
exports.ImgProductsController = void 0;
const common_1 = require("@nestjs/common");
const img_products_service_1 = require("./img_products.service");
const create_img_product_dto_1 = require("./dto/create-img_product.dto");
const platform_express_1 = require("@nestjs/platform-express");
let ImgProductsController = class ImgProductsController {
    constructor(imgProductsService) {
        this.imgProductsService = imgProductsService;
    }
    create(id, createImgProductDto, file) {
        return this.imgProductsService.create(createImgProductDto, file, id);
    }
    findOne(id) {
        return this.imgProductsService.findOne(id);
    }
    remove(id) {
        return this.imgProductsService.remove(id);
    }
    findByProduct(id) {
        return this.imgProductsService.findByProduct(id);
    }
};
exports.ImgProductsController = ImgProductsController;
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_img_product_dto_1.CreateImgProductDto, Object]),
    __metadata("design:returntype", void 0)
], ImgProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ImgProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ImgProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ImgProductsController.prototype, "findByProduct", null);
exports.ImgProductsController = ImgProductsController = __decorate([
    (0, common_1.Controller)('img-products'),
    __metadata("design:paramtypes", [img_products_service_1.ImgProductsService])
], ImgProductsController);
//# sourceMappingURL=img_products.controller.js.map