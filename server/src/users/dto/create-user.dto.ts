import { IsEmail, IsNotEmpty } from 'class-validator';

//data transfer object // class = { }
export class CreateUserDto {
    @IsEmail({},{ message:'Email sai định dạng'})

     @IsNotEmpty({ message: 'Địa chỉ mail không được để trống', })
    email: string;

     @IsNotEmpty({ message: 'Mật khẩu không được để trống', })
    password: string;

    @IsNotEmpty({ message: 'Họ và tên không được để trống', })
    fullname: string;
    
     @IsNotEmpty({ message: 'Địa chỉ không được để trống', })
    address: string;

    @IsNotEmpty({ message: 'Só điện thoại không được để trống', })
    numberphone:string;
}