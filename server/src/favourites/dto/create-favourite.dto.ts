import { IsNotEmpty } from "class-validator";

export class CreateFavouriteDto {
    @IsNotEmpty({ message: 'Trạng thái không được để trống', })
    status:boolean
}
