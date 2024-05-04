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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async create(createProductDto) {
        try {
            const check_name = await this.productoRepository.findOneBy({ name_product: createProductDto.name_product });
            if (check_name) {
                return 'Đã tồn tại tên sản phẩm này';
            }
            else {
                const product = await this.productoRepository.save(createProductDto);
                return product;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.productoRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} product`;
    }
    async update(id, updateProductDto) {
        try {
            const check_id = await this.productoRepository.findOne({ where: { id } });
            if (check_id) {
                if (updateProductDto.name_product !== check_id.name_product) {
                    const check_name = await this.productoRepository.findOneBy({ name_product: updateProductDto.name_product });
                    if (!check_name) {
                        await this.productoRepository.update(id, updateProductDto);
                        return `Đã cập nhật`;
                    }
                    else {
                        return `Đã tồn tại tên sản phẩm này`;
                    }
                }
            }
            else {
                return `Không tìm thấy sản phẩm`;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map