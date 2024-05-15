import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './entities/favourite.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite)
    private favouriteRepository: Repository<Favourite>,
    private userService: UsersService,
    private productService: ProductsService,

  ) { }

 async create(createFavouriteDto: CreateFavouriteDto, user_id: number, product_id: number) {
    try {
      console.log(user_id)
      const user_check = await this.userService.findOne(user_id)
      const product_check  = await this.productService.findOne(product_id)
       if (user_check  && product_check ) {
        const check_favourite = await this.favouriteRepository.find({
          where: {
            user: { id: user_id },
            product: { id: product_id }
          },
          relations: ['user', 'product']
        });
        if (check_favourite.length > 0) {
          await this.favouriteRepository.delete({ id: check_favourite[0].id });
          return { message: "Bỏ lưu sản phẩm" }
        }
        else {
          createFavouriteDto.user = user_check
          createFavouriteDto.product = product_check
          await this.favouriteRepository.save(createFavouriteDto)
          return { message: "Lưu sản phẩm" }
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return  this.favouriteRepository.find
    ({
      relations: ['user', 'product'],
    })
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
