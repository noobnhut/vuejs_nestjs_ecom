import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { query } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post(':id')
  create(@Body() createProductDto: CreateProductDto, @Param('id') id: number) {
    return this.productsService.create(createProductDto, id);
  }

  // @Get()
  // findAll(
  //   @Query('page') page: number,
  //   @Query('limit') limit: number,
  // ) {
  //   return this.productsService.findAll(page,limit);
  // }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }


  @Get('/search')
  findName(
    @Query('name') name: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('check') check: string,) {
    return this.productsService.findProductByName(name, page, limit,check)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Get('/cat/:id')
  findByCat(
    @Param('id') catId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('check') check: string,

  ) {
    return this.productsService.findProductByCat(catId, page, limit,check)
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
