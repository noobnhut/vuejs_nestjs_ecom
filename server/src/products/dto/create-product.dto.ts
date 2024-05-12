import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
    @IsNotEmpty({
        message: 'Vui lòng nhập tên sản phẩm',
    })
    name_product: string;

    des_product: string;

    @IsNotEmpty({
        message: 'Vui lòng nhập giá tiền',
    })
    price: number;

    cat: Category


    @IsNotEmpty({
        message: 'Vui lòng nhập số lượng',
    })
    quantity: number;

    real_quantity: number;
}
