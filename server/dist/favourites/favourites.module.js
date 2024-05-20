"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesModule = void 0;
const common_1 = require("@nestjs/common");
const favourites_service_1 = require("./favourites.service");
const favourites_controller_1 = require("./favourites.controller");
const typeorm_1 = require("@nestjs/typeorm");
const favourite_entity_1 = require("./entities/favourite.entity");
const products_module_1 = require("../products/products.module");
const users_module_1 = require("../users/users.module");
let FavouritesModule = class FavouritesModule {
};
exports.FavouritesModule = FavouritesModule;
exports.FavouritesModule = FavouritesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([favourite_entity_1.Favourite]), products_module_1.ProductsModule, users_module_1.UsersModule],
        controllers: [favourites_controller_1.FavouritesController],
        providers: [favourites_service_1.FavouritesService]
    })
], FavouritesModule);
//# sourceMappingURL=favourites.module.js.map