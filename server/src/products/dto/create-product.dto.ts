import {IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({
        message: 'Vui lòng nhập tên sản phẩm',
    })
    name_product: string;
    
    des_product: string;

    @IsNotEmpty({
        message: 'Vui lòng nhập giá tiền',
    })
    price:number;
}
