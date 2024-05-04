import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Repository } from 'typeorm';
import { Favourite } from './entities/favourite.entity';
export declare class FavouritesService {
    private favouriteRepository;
    constructor(favouriteRepository: Repository<Favourite>);
    create(createFavouriteDto: CreateFavouriteDto): Promise<CreateFavouriteDto & Favourite>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFavouriteDto: UpdateFavouriteDto): string;
    remove(id: number): string;
}
