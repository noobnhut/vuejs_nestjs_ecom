import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ImgProduct } from 'src/img_products/entities/img_product.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CategoriesService {
  constructor(
    private productsService: ProductsService,

    @InjectRepository(Category)
    private catRepository: Repository<Category>,

    @InjectRepository(Product)
    private productoRepository: Repository<Product>,
  ) 
  

  // @InjectRepository(ImgProduct)
  // private imgProductRepository: Repository<ImgProduct>,
  {}

  async create(createCategoryDto: CreateCategoryDto) {
    // return await this.catRepository.save(CreateCategoryDto);
    try {
      const check_name = await this.catRepository.findOneBy({
        name_cat: createCategoryDto.name_cat,
      });
      if (check_name) {
        return 'Đã tồn tại tên cat này';
      } else {
        const cat = await this.catRepository.save(createCategoryDto);
        return 'Đã thêm thành công';
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    // return `This action returns all categories`;
    return this.catRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
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
          return `Đã tồn tại tên cat này`;
        }
      } else {
        return `Không tìm thấy cat`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} category`; 
    try {
      const check_id = await this.catRepository.findOne({ where: { id } });
      if (check_id) {
        // const check_product = await this.productsService.findAllProCat(check_id);
        // if(check_product.length > 0){
        //   // await this.productsService.removeProductFromCat(check_product);
        // }else{
        //   await this.catRepository.delete({ id });
        //   return 'Xóa danh mục thành công'; 
        // }
        const has_product = await this.productoRepository.findOne({where: {cat: check_id}})
        if(!has_product){
          await this.catRepository.delete({ id });
          return 'Xóa danh mục thành công';
        }else{
          return 'không thể xóa vì danh mục này còn sản phẩm';
        }
      } else {
        return 'không tìm thấy danh mục';
      }
    } catch (error) {
      console.log(error);
    }
  }
}
