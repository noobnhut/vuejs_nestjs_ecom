import { Module, forwardRef } from '@nestjs/common';
import { ImgProductsService } from './img_products.service';
import { ImgProductsController } from './img_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgProduct } from './entities/img_product.entity';
import { v2 as cloudinary } from 'cloudinary';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ImgProduct]),
  forwardRef(() => ProductsModule),
  ],
  controllers: [ImgProductsController],
  exports:[ImgProductsService],
  providers: [ImgProductsService, {
    provide: 'CLOUDINARY',
    useFactory: () => cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret:
        process.env.CLOUDINARY_API_SECRET,
    })
  }]
})
export class ImgProductsModule { }
