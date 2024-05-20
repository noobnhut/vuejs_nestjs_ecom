import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<"Không được để trống" | "Đã tồn tại mã coupon này" | "Thêm coupon thành công">;
    findAll(): Promise<import("./entities/coupon.entity").Coupon[]>;
    findOne(id: string): Promise<import("./entities/coupon.entity").Coupon>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<"Đã cập nhật" | "Đã tồn tại mã coupon này" | "Không tìm thấy coupon">;
    remove(id: string): Promise<"Không tìm thấy coupon" | "Xóa coupon thành công">;
}
