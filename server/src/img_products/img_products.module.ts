import { Module } from '@nestjs/common';
import { ImgProductsService } from './img_products.service';
import { ImgProductsController } from './img_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgProduct } from './entities/img_product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ImgProduct])],

  controllers: [ImgProductsController],
  providers: [ImgProductsService]
})
export class ImgProductsModule {}
