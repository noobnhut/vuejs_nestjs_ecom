import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
export declare class CouponsService {
    private couponRepository;
    constructor(couponRepository: Repository<Coupon>);
    create(createCouponDto: CreateCouponDto): Promise<"Không được để trống" | "Đã tồn tại tên coupon này" | (CreateCouponDto & Coupon)>;
    findAll(): Promise<Coupon[]>;
    findOne(id: number): string;
    update(id: number, updateCouponDto: UpdateCouponDto): Promise<"Đã cập nhật" | "Đã tồn tại tên coupon này" | "Không tìm thấy coupon">;
    remove(id: number): Promise<"Không tìm thấy coupon" | "Xóa coupon thành công">;
}
