"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTypeOrmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./users/entities/user.entity");
const category_entity_1 = require("./categories/entities/category.entity");
const product_entity_1 = require("./products/entities/product.entity");
const img_product_entity_1 = require("./img_products/entities/img_product.entity");
const favourite_entity_1 = require("./favourites/entities/favourite.entity");
const coupon_entity_1 = require("./coupons/entities/coupon.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const order_detail_entity_1 = require("./order_details/entities/order_detail.entity");
let CustomTypeOrmModule = class CustomTypeOrmModule {
};
exports.CustomTypeOrmModule = CustomTypeOrmModule;
exports.CustomTypeOrmModule = CustomTypeOrmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 3306),
                    username: configService.get('DB_USERNAME', 'root'),
                    password: configService.get('DB_PASSWORD', ''),
                    database: configService.get('DB_DATABASE', 'ecom'),
                    entities: [user_entity_1.User, category_entity_1.Category, product_entity_1.Product, img_product_entity_1.ImgProduct, favourite_entity_1.Favourite, coupon_entity_1.Coupon, order_entity_1.Order, order_detail_entity_1.OrderDetail],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], CustomTypeOrmModule);
//# sourceMappingURL=typeorm.config.js.map