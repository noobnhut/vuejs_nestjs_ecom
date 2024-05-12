import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {  InjectRepository } from '@nestjs/typeorm';
import {  Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private productService: ProductsService,
    @InjectRepository(Category)
    private catRepository: Repository<Category>,
  
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    // return await this.catRepository.save(CreateCategoryDto);
    try {
      const check_name = await this.catRepository.findOneBy({
        name_cat: createCategoryDto.name_cat,
      });
      if (check_name) {
        return 'Đã tồn tại tên cat này'
      } else {
        const cat = await this.catRepository.save(createCategoryDto);
        return 'Đã thêm thành công';
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.catRepository.find();
  }

  // lay ra cat co product
  async findCategoriesWithProducts() {
    return await this.catRepository
      .createQueryBuilder('category')
      .innerJoin('category.products', 'product')
      .select(['category.id', 'category.name_cat'])
      .distinct(true) // Đảm bảo không có bản ghi trùng lặp
      .getMany();
 }
  
  findOne(id: number) {
    // return `This action returns a #${id} category`;
    return this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // return `This action updates a #${id} category`;
    try {
      const check_id = await this.catRepository.findOne({ where: { id } });
      if (check_id) {
        const check_name = await this.catRepository.findOneBy({
          name_cat: updateCategoryDto.name_cat,
          id: Not(id) 
        });
        if (!check_name) {
          await this.catRepository.update(id, updateCategoryDto);
          return `Đã cập nhật`;
        } else {
          return 'Đã tồn tại tên cat này';
        }
      } else {
        const errorResponse = {
          message: `Không tìm thấy cat`,
          statusCode: 404
        };
        return errorResponse;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
     const check_cat = await this.catRepository.findOneBy({id:id})
     if(check_cat)
       {
         // check product
         const products = await this.productService.findProductByCat(id)
         if(products.products.length > 0)
           {
            return 'Không thể xóa vì cat này chứ product'
           }
           else
           {
             await this.catRepository.delete(check_cat)
             return 'Xóa thành công'
           }
       }
       else
       {
         return 'khong ton tai'
       }
 
    } catch (error) {
     console.log(error)
    }
   }
}
