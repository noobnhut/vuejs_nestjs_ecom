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
let FavouritesService = class FavouritesService {
    constructor(favouriteRepository) {
        this.favouriteRepository = favouriteRepository;
    }
    async create(createFavouriteDto) {
        return await this.favouriteRepository.save(createFavouriteDto);
    }
    findAll() {
        return `This action returns all favourites`;
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavouritesService);
//# sourceMappingURL=favourites.service.js.map