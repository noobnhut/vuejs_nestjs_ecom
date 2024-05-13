import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post(':id')
  create
  (@Param('id') id: number, 
   @Body() createOrderDto: CreateOrderDto,
   @Body('carts') carts: any) {
    return this.ordersService.create(createOrderDto, id,carts);
  }

  @Post('/create-vnp/:id')
  async createVNP(@Body() createOrderDto: CreateOrderDto, @Param('id') id: number, @Req() req: any, @Body('bank') bank: string, @Body('carts') carts: any) {
    return this.ordersService.createVNP(createOrderDto, id, req, bank, carts);
  }

  @Get('/vnpay_get')
  getVNP(@Query('query') query: any) {
    return this.ordersService.getVNP(query);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto, @Query('check_create') check_create: Boolean) {
    return this.ordersService.update(id, updateOrderDto, check_create);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
