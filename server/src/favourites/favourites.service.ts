import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './entities/favourite.entity';
@Injectable()
export class FavouritesService {
  constructor(
  @InjectRepository(Favourite)
    private favouriteRepository: Repository<Favourite>,
  ) {}

  async create(createFavouriteDto: CreateFavouriteDto) {
    return await this.favouriteRepository.save(createFavouriteDto);
  }

  findAll() {
    return `This action returns all favourites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favourite`;
  }

  update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
    return `This action updates a #${id} favourite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favourite`;
  }
}
