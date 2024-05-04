"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImgProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_img_product_dto_1 = require("./create-img_product.dto");
class UpdateImgProductDto extends (0, mapped_types_1.PartialType)(create_img_product_dto_1.CreateImgProductDto) {
}
exports.UpdateImgProductDto = UpdateImgProductDto;
//# sourceMappingURL=update-img_product.dto.js.map