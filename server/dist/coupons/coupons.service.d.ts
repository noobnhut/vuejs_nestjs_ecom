import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
export declare class CouponsService {
    private couponRepository;
    constructor(couponRepository: Repository<Coupon>);
    create(createCouponDto: CreateCouponDto): Promise<CreateCouponDto & Coupon>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCouponDto: UpdateCouponDto): string;
    remove(id: number): string;
}
