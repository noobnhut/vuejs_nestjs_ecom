import {IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    name_product: string;
    des_product: string;
    price:number;
}
