import { IsNotEmpty } from 'class-validator';
export class CreateImgProductDto {
    @IsNotEmpty({ message: 'Không được để trống', })
    img_name: string;

    @IsNotEmpty({ message: 'Không được để trống', })
    img_url: string;
}
