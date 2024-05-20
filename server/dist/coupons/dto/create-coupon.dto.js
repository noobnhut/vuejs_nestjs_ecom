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
exports.CreateCouponDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCouponDto {
}
exports.CreateCouponDto = CreateCouponDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Không được để trống', }),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "coupon_name", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.Min)(0, { message: 'Tối thiểu là 0%', }),
    (0, class_validator_1.Max)(50, { message: 'Phần trăm tối đa là 50%', }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Không được để trống', }),
    (0, class_validator_1.IsInt)({ message: 'Phải là số nguyên', }),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "coupon_percent", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'Số lượng tối thiểu là 1', }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Không được để trống', }),
    (0, class_validator_1.IsInt)({ message: 'Phải là số nguyên', }),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "coupon_quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Không được để trống', }),
    __metadata("design:type", Date)
], CreateCouponDto.prototype, "date_at", void 0);
//# sourceMappingURL=create-coupon.dto.js.map