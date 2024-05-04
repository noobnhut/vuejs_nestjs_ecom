import { IsNotEmpty } from "class-validator";

export class CreateCouponDto {  
    @IsNotEmpty({ message: 'Không được để trống', })
    coupon_name: string;

    @IsNotEmpty({ message: 'Không được để trống', })
    coupon_percent: number;

    @IsNotEmpty({ message: 'Không được để trống', })
    coupon_quantity: number;
}
