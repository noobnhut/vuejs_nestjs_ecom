import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

// Data transfer object class
export class CreateUserDto {
    @IsEmail({}, { message: 'Email sai định dạng' })
    @IsNotEmpty({ message: 'Địa chỉ mail không được để trống' })
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @Length(8, 20, { message: 'Mật khẩu phải có độ dài từ 8 đến 20 ký tự' })
    @Matches(/(?=.*[a-z])/, { message: 'Mật khẩu phải chứa ít nhất một chữ thường' })
    @Matches(/(?=.*[A-Z])/, { message: 'Mật khẩu phải chứa ít nhất một chữ hoa' })
    @Matches(/(?=.*\d)/, { message: 'Mật khẩu phải chứa ít nhất một chữ số' })
    password: string;

    @IsNotEmpty({ message: 'Họ và tên không được để trống' })
    fullname: string;

    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    address: string;

    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    numberphone: string;
}
