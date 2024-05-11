import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { query } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':id')
  create(@Body()  createProductDto: CreateProductDto, @Param('id') id: number) {
    return this.productsService.create(createProductDto, id);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.productsService.findAll(page,limit);
  }

  @Get('/search')
  getExample(@Query('name') name: string) { 
      return this.productsService.findProductByName(name)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }
  

  @Get('/cat')
  findByCat(@Query('catId') catId: number)
  {
    return this.productsService.findProductByCat(catId)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
