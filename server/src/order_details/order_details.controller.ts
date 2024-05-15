import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post(':id')
  create(@Body() createOrderDetailDto: CreateOrderDetailDto,@Param('id') id:number) {
    return this.orderDetailsService.create(createOrderDetailDto,id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderDetailsService.remove(id);
  }
}
