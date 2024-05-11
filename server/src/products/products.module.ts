import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { ImgProductsModule } from 'src/img_products/img_products.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), 
    forwardRef(() => CategoriesModule),
    forwardRef(() => ImgProductsModule), // Sử dụng forwardRef() ở đây
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}