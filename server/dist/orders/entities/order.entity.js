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
exports.Order = exports.Payment = exports.OrderStatus = void 0;
const order_detail_entity_1 = require("../../order_details/entities/order_detail.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DaGiaoHang"] = "\u0110\u00E3 giao h\u00E0ng";
    OrderStatus["DaDat"] = "\u0110\u00E3 \u0111\u1EB7t";
    OrderStatus["DaThanhToan"] = "\u0110\u00E3 thanh to\u00E1n";
    OrderStatus["DangGiao"] = "\u0110ang giao h\u00E0ng";
    OrderStatus["DaHuy"] = "\u0110\u00E3 h\u1EE7y";
    OrderStatus["ThatBai"] = "Thanh to\u00E1n th\u1EA5t b\u1EA1i";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var Payment;
(function (Payment) {
    Payment["COD"] = "COD";
    Payment["VNPAY"] = "VNPAY";
})(Payment || (exports.Payment = Payment = {}));
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'double' }),
    __metadata("design:type", Number)
], Order.prototype, "total_order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'double' }),
    __metadata("design:type", Number)
], Order.prototype, "total_coupon", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Order.prototype, "vnp_orderID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Order.prototype, "total_bank", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "date_bank", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.DaDat,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Payment,
        default: Payment.COD,
    }),
    __metadata("design:type", String)
], Order.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.orders),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetail, OrderDetail => OrderDetail.order),
    __metadata("design:type", Array)
], Order.prototype, "ods", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "updated_at", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' })
], Order);
//# sourceMappingURL=order.entity.js.map