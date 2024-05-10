import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Tên cat không được để trống',})
    name_cat: string;
}
