import { Injectable } from '@nestjs/common';
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImgProduct } from './entities/img_product.entity';
@Injectable()
export class ImgProductsService {
  constructor(
    @InjectRepository(ImgProduct)
    private imgProductRepository: Repository<ImgProduct>,
  ) {}
  
  async create(createImgProductDto: CreateImgProductDto) {
    // return await this.imgProductRepository.save(createImgProductDto);
    try {
      await this.imgProductRepository.save(createImgProductDto);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    // return `This action returns all imgProducts`;
    return this.imgProductRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} imgProduct`;
  }

  async update(id: number, updateImgProductDto: UpdateImgProductDto) {
    // return `This action updates a #${id} imgProduct`;
    try {
      await this.imgProductRepository.update(id, updateImgProductDto);
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} imgProduct`;
  }
}
