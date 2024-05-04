"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFavouriteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_favourite_dto_1 = require("./create-favourite.dto");
class UpdateFavouriteDto extends (0, mapped_types_1.PartialType)(create_favourite_dto_1.CreateFavouriteDto) {
}
exports.UpdateFavouriteDto = UpdateFavouriteDto;
//# sourceMappingURL=update-favourite.dto.js.map