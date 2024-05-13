import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
    @IsNotEmpty({
        message: 'Vui lòng nhập tên sản phẩm',
    })
    name_product: string;

    des_product: string;

    @Min(1, { message: 'Giá tiền tối thiểu là 1000', })
    @IsInt({ message: 'Phải là số nguyên', })
    @IsNotEmpty({
        message: 'Vui lòng nhập giá tiền',
    })
    price: number;

    cat: Category

    @Min(1, { message: 'Số lượng tối thiểu là 1', })
    @IsInt({ message: 'Phải là số nguyên', })
    @IsNotEmpty({
        message: 'Vui lòng nhập số lượng',
    })
    quantity: number;

    real_quantity: number;
}
