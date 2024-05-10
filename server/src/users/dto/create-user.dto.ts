import { IsEmail, IsNotEmpty } from 'class-validator';

//data transfer object // class = { }
export class CreateUserDto {
    // @IsNotEmpty({ message: 'email không được để trống', })
    email: string;

    // @IsNotEmpty({ message: 'password không được để trống', })
    password: string;

    // @IsNotEmpty({ message: 'fullname không được để trống', })
    fullname: string;
    
    // @IsNotEmpty({ message: 'address không được để trống', })
    address: string;

    // @IsNotEmpty({ message: 'numberphone không được để trống', })
    numberphone:string;
}