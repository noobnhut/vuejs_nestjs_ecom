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
exports.CreateOrderDto = exports.OrderStatus = exports.Payment = void 0;
const class_validator_1 = require("class-validator");
var Payment;
(function (Payment) {
    Payment["COD"] = "COD";
    Payment["VNPAY"] = "VNPAY";
})(Payment || (exports.Payment = Payment = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DaGiaoHang"] = "\u0110\u00E3 giao h\u00E0ng";
    OrderStatus["DaDat"] = "\u0110\u00E3 \u0111\u1EB7t";
    OrderStatus["DaThanhToan"] = "\u0110\u00E3 thanh to\u00E1n";
    OrderStatus["DangGiao"] = "\u0110ang giao h\u00E0ng";
    OrderStatus["DaHuy"] = "\u0110\u00E3 h\u1EE7y";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Không được để trống', }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total_order", void 0);
//# sourceMappingURL=create-order.dto.js.map