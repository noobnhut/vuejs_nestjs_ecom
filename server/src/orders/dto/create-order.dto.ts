import { IsNotEmpty } from 'class-validator';
export class CreateOrderDto {
    @IsNotEmpty({ message: 'Không được để trống', })
    total_order: number;
    
    @IsNotEmpty({ message: 'Không được để trống', })
    total_coupon: number
}
