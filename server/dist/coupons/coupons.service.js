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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coupon_entity_1 = require("./entities/coupon.entity");
let CouponsService = class CouponsService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    async create(createCouponDto) {
        try {
            const check_name = await this.couponRepository.findOneBy({
                coupon_name: createCouponDto.coupon_name,
            });
            if (createCouponDto.coupon_name.length < 0) {
                return 'Không được để trống';
            }
            else {
                if (check_name) {
                    return 'Đã tồn tại mã coupon này';
                }
                else {
                    const coupon = await this.couponRepository.save(createCouponDto);
                    return 'Thêm coupon thành công';
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        return this.couponRepository.find();
    }
    findOne(id) {
        return this.couponRepository.findOneBy({ id });
    }
    async update(id, updateCouponDto) {
        try {
            const check_id = await this.couponRepository.findOne({ where: { id } });
            if (check_id) {
                const check_name = await this.couponRepository.findOneBy({
                    coupon_name: updateCouponDto.coupon_name,
                    id: (0, typeorm_2.Not)(id),
                });
                if (!check_name) {
                    await this.couponRepository.update(id, updateCouponDto);
                    return `Đã cập nhật`;
                }
                else {
                    return `Đã tồn tại mã coupon này`;
                }
            }
            else {
                return `Không tìm thấy coupon`;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(id) {
        try {
            const check_id = await this.couponRepository.findOne({ where: { id } });
            if (check_id) {
                await this.couponRepository.delete({ id });
                return 'Xóa coupon thành công';
            }
            else {
                return `Không tìm thấy coupon`;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map