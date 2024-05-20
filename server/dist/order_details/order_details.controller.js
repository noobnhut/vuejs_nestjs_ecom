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
exports.OrderDetailsController = void 0;
const common_1 = require("@nestjs/common");
const order_details_service_1 = require("./order_details.service");
const create_order_detail_dto_1 = require("./dto/create-order_detail.dto");
let OrderDetailsController = class OrderDetailsController {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }
    create(createOrderDetailDto, id) {
        return this.orderDetailsService.create(createOrderDetailDto, id);
    }
    remove(id) {
        return this.orderDetailsService.remove(id);
    }
};
exports.OrderDetailsController = OrderDetailsController;
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_detail_dto_1.CreateOrderDetailDto, Number]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "remove", null);
exports.OrderDetailsController = OrderDetailsController = __decorate([
    (0, common_1.Controller)('order-details'),
    __metadata("design:paramtypes", [order_details_service_1.OrderDetailsService])
], OrderDetailsController);
//# sourceMappingURL=order_details.controller.js.map