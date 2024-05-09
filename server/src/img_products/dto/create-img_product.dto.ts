import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
export class CreateImgProductDto {
    // @IsNotEmpty({ message: 'Không được để trống', })
    img_public_key: string;

    // @IsNotEmpty({ message: 'Không được để trống', })
    img_url: string;

    product:Product

}
