"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favourite_entity_1 = require("./entities/favourite.entity");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
let FavouritesService = class FavouritesService {
    constructor(favouriteRepository, userService, productService) {
        this.favouriteRepository = favouriteRepository;
        this.userService = userService;
        this.productService = productService;
    }
    async create(createFavouriteDto, user_id, product_id) {
        try {
            console.log(user_id);
            const user_check = await this.userService.findOne(user_id);
            const product_check = await this.productService.findOne(product_id);
            if (user_check && product_check) {
                const check_favourite = await this.favouriteRepository.find({
                    where: {
                        user: { id: user_id },
                        product: { id: product_id }
                    },
                    relations: ['user', 'product']
                });
                if (check_favourite.length > 0) {
                    await this.favouriteRepository.delete({ id: check_favourite[0].id });
                    return { message: "Bỏ lưu sản phẩm" };
                }
                else {
                    createFavouriteDto.user = user_check;
                    createFavouriteDto.product = product_check;
                    await this.favouriteRepository.save(createFavouriteDto);
                    return { message: "Lưu sản phẩm" };
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.favouriteRepository.find({
            relations: ['user', 'product'],
        });
    }
    findOne(id) {
        return `This action returns a #${id} favourite`;
    }
    update(id, updateFavouriteDto) {
        return `This action updates a #${id} favourite`;
    }
    remove(id) {
        return `This action removes a #${id} favourite`;
    }
};
exports.FavouritesService = FavouritesService;
exports.FavouritesService = FavouritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favourite_entity_1.Favourite)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        products_service_1.ProductsService])
], FavouritesService);
//# sourceMappingURL=favourites.service.js.map