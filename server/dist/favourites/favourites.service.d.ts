import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Repository } from 'typeorm';
import { Favourite } from './entities/favourite.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
export declare class FavouritesService {
    private favouriteRepository;
    private userService;
    private productService;
    constructor(favouriteRepository: Repository<Favourite>, userService: UsersService, productService: ProductsService);
    create(createFavouriteDto: CreateFavouriteDto, user_id: number, product_id: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<Favourite[]>;
    findOne(id: number): string;
    update(id: number, updateFavouriteDto: UpdateFavouriteDto): string;
    remove(id: number): string;
}
