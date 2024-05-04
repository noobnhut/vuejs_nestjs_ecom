import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { checkPrime } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productoRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // return 'This action adds a new product';
    try {
      const check_name = await this.productoRepository.findOneBy({name_product: createProductDto.name_product})
      if(check_name){
        return 'Đã tồn tại tên sản phẩm này'
      }else{
        const product = await this.productoRepository.save(createProductDto)
        return product;
      }
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    // return `This action returns all products`;
    return this.productoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // return `This action updates a #${id} product`;
    try {
      const check_id = await this.productoRepository.findOne({where: {id}});
      if(check_id){
        const check_name = await this.productoRepository.findOneBy({name_product: updateProductDto.name_product})
        if(!check_name){
          await this.productoRepository.update(id, updateProductDto);
          return `Đã cập nhật`
        }else{
          return `Đã tồn tại tên sản phẩm này`
        }
      }else{
        return `Không tìm thấy sản phẩm`
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
