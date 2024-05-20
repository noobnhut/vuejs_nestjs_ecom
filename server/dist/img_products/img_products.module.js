"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgProductsModule = void 0;
const common_1 = require("@nestjs/common");
const img_products_service_1 = require("./img_products.service");
const img_products_controller_1 = require("./img_products.controller");
const typeorm_1 = require("@nestjs/typeorm");
const img_product_entity_1 = require("./entities/img_product.entity");
const cloudinary_1 = require("cloudinary");
const products_module_1 = require("../products/products.module");
let ImgProductsModule = class ImgProductsModule {
};
exports.ImgProductsModule = ImgProductsModule;
exports.ImgProductsModule = ImgProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([img_product_entity_1.ImgProduct]),
            (0, common_1.forwardRef)(() => products_module_1.ProductsModule),
        ],
        controllers: [img_products_controller_1.ImgProductsController],
        exports: [img_products_service_1.ImgProductsService],
        providers: [img_products_service_1.ImgProductsService, {
                provide: 'CLOUDINARY',
                useFactory: () => cloudinary_1.v2.config({
                    cloud_name: process.env.CLOUDINARY_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET,
                })
            }]
    })
], ImgProductsModule);
//# sourceMappingURL=img_products.module.js.map