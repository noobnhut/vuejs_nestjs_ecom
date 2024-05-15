import { IsNotEmpty } from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";

export class CreateFavouriteDto {
    @IsNotEmpty({ message: 'Trạng thái không được để trống', })
    status:boolean

    user:User

    product:Product
}
