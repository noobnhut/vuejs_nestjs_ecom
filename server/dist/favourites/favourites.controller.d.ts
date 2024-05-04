import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
export declare class FavouritesController {
    private readonly favouritesService;
    constructor(favouritesService: FavouritesService);
    create(createFavouriteDto: CreateFavouriteDto): Promise<CreateFavouriteDto & import("./entities/favourite.entity").Favourite>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFavouriteDto: UpdateFavouriteDto): string;
    remove(id: string): string;
}
