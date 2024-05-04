import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<CreateCouponDto & import("./entities/coupon.entity").Coupon>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCouponDto: UpdateCouponDto): string;
    remove(id: string): string;
}
