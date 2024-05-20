import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
export declare class FavouritesController {
    private readonly favouritesService;
    constructor(favouritesService: FavouritesService);
    create(createFavouriteDto: CreateFavouriteDto, user: number, product: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entities/favourite.entity").Favourite[]>;
    findOne(id: string): string;
}
