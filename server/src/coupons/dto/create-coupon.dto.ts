import { Allow, IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateCouponDto {  
    @IsNotEmpty({ message: 'Không được để trống', })
    coupon_name: string;

    @Allow()
    @Min(0, { message: 'Tối thiểu là 0%', })
    @Max(50, { message: 'Phần trăm tối đa là 50%', })
    @IsOptional()
    @IsNotEmpty({ message: 'Không được để trống', })
    @IsInt({ message: 'Phải là số nguyên', })
    coupon_percent: number;

   
    @Min(1, { message: 'Số lượng tối thiểu là 1', })
    @IsOptional()
    @IsNotEmpty({ message: 'Không được để trống', })
    @IsInt({ message: 'Phải là số nguyên', })
    // @Max(10000, { message: 'Không được lớn hơn 10000', })
    coupon_quantity: number;

    @IsNotEmpty({ message: 'Không được để trống', })
    date_at:Date

}
