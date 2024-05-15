import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { ImgProductsService } from './img_products.service';
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/products/entities/product.entity';

@Controller('img-products')
export class ImgProductsController {
  constructor(private readonly imgProductsService: ImgProductsService) { }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file')) // biến truyền vào
  create(
    @Param('id') id: number,
    @Body() createImgProductDto: CreateImgProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.imgProductsService.create(createImgProductDto,file,id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.imgProductsService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.imgProductsService.remove(id);
  }

  @Get('product/:id')
  findByProduct(@Param('id') id: number)
  {
    return this.imgProductsService.findByProduct(id)
  }

  // // 1 file
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file')) // biến truyền vào
  // uploadImage(
  //   @UploadedFile() file: Express.Multer.File /* rep cái file */,
  // ) {
  //   return this.imgProductsService.uploadFile(file);
  // }

  // // nhieu file cung luc
  // @Post('uploads')
  // @UseInterceptors(FilesInterceptor('file[]', 5))
  // uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
  //   //... handle multiple files
  // }
}
