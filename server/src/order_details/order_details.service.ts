import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { ProductsService } from 'src/products/products.service';
@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private productService:ProductsService
  ) { }

  async create(createOrderDetailDto: CreateOrderDetailDto,id:number) {
    const product_get = await this.productService.findOne(id)
    createOrderDetailDto.product = product_get
    return await this.orderDetailRepository.save(createOrderDetailDto);
  }

  async creates(single_price:number,quantity:number,id:number,orders:any) {
    const product_get = await this.productService.findOne(id)
    await this.productService.updateQuantity(id,quantity)
    let product = product_get
    return await this.orderDetailRepository.save(
      {
        product:product,
        single_price:single_price,
        quantity:quantity,
        order:orders
      }
    );
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
