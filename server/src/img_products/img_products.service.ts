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
    return await this.imgProductRepository.save(createImgProductDto);
  }

  findAll() {
    return `This action returns all imgProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imgProduct`;
  }

  update(id: number, updateImgProductDto: UpdateImgProductDto) {
    return `This action updates a #${id} imgProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} imgProduct`;
  }
}
