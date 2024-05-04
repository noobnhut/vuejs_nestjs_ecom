import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImgProductsService } from './img_products.service';
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';

@Controller('img-products')
export class ImgProductsController {
  constructor(private readonly imgProductsService: ImgProductsService) {}

  @Post()
  create(@Body() createImgProductDto: CreateImgProductDto) {
    return this.imgProductsService.create(createImgProductDto);
  }

  @Get()
  findAll() {
    return this.imgProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImgProductDto: UpdateImgProductDto) {
    return this.imgProductsService.update(+id, updateImgProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgProductsService.remove(+id);
  }
}
