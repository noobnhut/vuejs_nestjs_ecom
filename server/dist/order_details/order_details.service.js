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
exports.OrderDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_detail_entity_1 = require("./entities/order_detail.entity");
const products_service_1 = require("../products/products.service");
let OrderDetailsService = class OrderDetailsService {
    constructor(orderDetailRepository, productService) {
        this.orderDetailRepository = orderDetailRepository;
        this.productService = productService;
    }
    async create(createOrderDetailDto, id) {
        const product_get = await this.productService.findOne(id);
        createOrderDetailDto.product = product_get;
        return await this.orderDetailRepository.save(createOrderDetailDto);
    }
    async creates(single_price, quantity, id, orders) {
        const product_get = await this.productService.findOne(id);
        await this.productService.updateQuantity(id, quantity);
        let product = product_get;
        return await this.orderDetailRepository.save({
            product: product,
            single_price: single_price,
            quantity: quantity,
            order: orders
        });
    }
    remove(id) {
        return `This action removes a #${id} orderDetail`;
    }
};
exports.OrderDetailsService = OrderDetailsService;
exports.OrderDetailsService = OrderDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], OrderDetailsService);
//# sourceMappingURL=order_details.service.js.map