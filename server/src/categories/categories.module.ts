import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ProductsModule } from 'src/products/products.module';
// import { ProductsService } from 'src/products/products.service';

@Module({
  imports:[
    ProductsModule,
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
