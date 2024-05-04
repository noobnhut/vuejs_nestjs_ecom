import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private catRepository: Repository<Category>,
  ) {}
async create(createCategoryDto: CreateCategoryDto) {
    // return await this.catRepository.save(CreateCategoryDto);
    let cat = await this.catRepository.create({
      name_cat: createCategoryDto.name_cat
    })
    return cat;
  }
  

  findAll() {
    // return `This action returns all categories`;
    return this.catRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
