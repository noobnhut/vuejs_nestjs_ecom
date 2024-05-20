import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<"Không được để trống" | "Đã tồn tại mã coupon này" | "Thêm coupon thành công">;
    findAll(): Promise<import("./entities/coupon.entity").Coupon[]>;
    findOne(id: number): Promise<import("./entities/coupon.entity").Coupon>;
    update(id: number, updateCouponDto: UpdateCouponDto): Promise<"Đã cập nhật" | "Đã tồn tại mã coupon này" | "Không tìm thấy coupon">;
    check(name: string): Promise<"counpon ko được rỗng" | "counpon đã hết hạn" | "counpon không tồn tại" | "Đã xảy ra lỗi" | {
        coupon: import("./entities/coupon.entity").Coupon;
    }>;
    change(id: number, check_create: string): Promise<"xong" | "ko tồn tại" | "Đã thay đổi số lượng">;
    remove(id: number): Promise<"Không tìm thấy coupon" | "Xóa coupon thành công">;
}
