import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Không được để trống', })
    name_cat: string;
}
