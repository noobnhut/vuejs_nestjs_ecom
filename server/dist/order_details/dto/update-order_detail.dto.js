"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_order_detail_dto_1 = require("./create-order_detail.dto");
class UpdateOrderDetailDto extends (0, mapped_types_1.PartialType)(create_order_detail_dto_1.CreateOrderDetailDto) {
}
exports.UpdateOrderDetailDto = UpdateOrderDetailDto;
//# sourceMappingURL=update-order_detail.dto.js.map