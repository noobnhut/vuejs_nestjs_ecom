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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const category_entity_1 = require("../../categories/entities/category.entity");
const favourite_entity_1 = require("../../favourites/entities/favourite.entity");
const img_product_entity_1 = require("../../img_products/entities/img_product.entity");
const order_detail_entity_1 = require("../../order_details/entities/order_detail.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64, nullable: false, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "name_product", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 256, nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "des_product", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'double' }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'double' }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'double' }),
    __metadata("design:type", Number)
], Product.prototype, "out_quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (cat) => cat.products),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "cat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => img_product_entity_1.ImgProduct, imgProduct => imgProduct.product),
    __metadata("design:type", Array)
], Product.prototype, "imgs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favourite_entity_1.Favourite, (favourite) => favourite.product),
    __metadata("design:type", Array)
], Product.prototype, "favourites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetail, (orderDetail) => orderDetail.product),
    __metadata("design:type", Array)
], Product.prototype, "order_details", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_deleted", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], Product);
//# sourceMappingURL=product.entity.js.map