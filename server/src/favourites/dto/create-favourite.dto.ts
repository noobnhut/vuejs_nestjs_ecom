import { IsNotEmpty } from "class-validator";

export class CreateFavouriteDto {
    @IsNotEmpty({ message: 'Password không được để trống', })
    status:boolean
}
