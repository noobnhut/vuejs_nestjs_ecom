import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  create(@Body() createFavouriteDto: CreateFavouriteDto,@Query('user') user:number,@Query('product') product:number) {
    return this.favouritesService.create(createFavouriteDto,user,product);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favouritesService.findOne(+id);
  }
}
