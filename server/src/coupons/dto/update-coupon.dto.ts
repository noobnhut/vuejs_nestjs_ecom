import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { IsNotEmpty } from "class-validator";

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
}
