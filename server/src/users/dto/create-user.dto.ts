import { IsEmail, IsNotEmpty } from 'class-validator';

//data transfer object // class = { }
export class CreateUserDto {
    email: string;

    password: string;

    fullname: string;
    
    address: string;

    numberphone:string;
}