import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put, Query } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  // @UsePipes(ValidationPipe)
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couponsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(id, updateCouponDto);
  }

  @Put('/check')
  check(@Body('coupon_name')name:string)
  {
    return this.couponsService.check_date(name)
  }
  
  @Put('/change/:id')
  change(@Param('id') id:number, @Query('check_create') check_create:string)
  {
    return this.couponsService.change_quantity(id,check_create)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.couponsService.remove(id);
  }
}
