import { Product } from "src/products/entities/product.entity"

export class CreateOrderDetailDto {
    single_price:number
    quantity:number
    product:Product
}
