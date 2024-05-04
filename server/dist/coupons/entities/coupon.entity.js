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
exports.Coupon = void 0;
const typeorm_1 = require("typeorm");
let Coupon = class Coupon {
};
exports.Coupon = Coupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: false, unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "coupon_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'bigint' }),
    __metadata("design:type", Number)
], Coupon.prototype, "coupon_percent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'bigint' }),
    __metadata("design:type", Number)
], Coupon.prototype, "coupon_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Coupon.prototype, "created_at", void 0);
exports.Coupon = Coupon = __decorate([
    (0, typeorm_1.Entity)({ name: 'coupons' })
], Coupon);
//# sourceMappingURL=coupon.entity.js.map