import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productoRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // return 'This action adds a new product';
    try {
      let product = await this.productoRepository.create({
        name_product: createProductDto.name_product, 
        des_product: createProductDto.des_product, 
        price: createProductDto.price
      })
      return product;
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
