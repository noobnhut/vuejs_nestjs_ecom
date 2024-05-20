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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const products_service_1 = require("../products/products.service");
let CategoriesService = class CategoriesService {
    constructor(productService, catRepository) {
        this.productService = productService;
        this.catRepository = catRepository;
    }
    async create(createCategoryDto) {
        try {
            const check_name = await this.catRepository.findOneBy({
                name_cat: createCategoryDto.name_cat,
            });
            if (check_name) {
                return 'Đã tồn tại tên cat này';
            }
            else {
                const cat = await this.catRepository.save(createCategoryDto);
                return 'Đã thêm thành công';
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.catRepository.find();
    }
    async findCategoriesWithProducts() {
        return await this.catRepository
            .createQueryBuilder('category')
            .innerJoin('category.products', 'product')
            .select(['category.id', 'category.name_cat'])
            .distinct(true)
            .getMany();
    }
    findOne(id) {
        return this.catRepository.findOneBy({ id });
    }
    async update(id, updateCategoryDto) {
        try {
            const check_id = await this.catRepository.findOne({ where: { id } });
            if (check_id) {
                const check_name = await this.catRepository.findOneBy({
                    name_cat: updateCategoryDto.name_cat,
                    id: (0, typeorm_2.Not)(id)
                });
                if (!check_name) {
                    await this.catRepository.update(id, updateCategoryDto);
                    return `Đã cập nhật`;
                }
                else {
                    return 'Đã tồn tại tên cat này';
                }
            }
            else {
                const errorResponse = {
                    message: `Không tìm thấy cat`,
                    statusCode: 404
                };
                return errorResponse;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(id) {
        try {
            let check_cat = await this.catRepository.findOneBy({ id: id });
            if (check_cat) {
                const products = await this.productService.findProductByCat(id);
                if (products.products.length > 0) {
                    return 'Không thể xóa vì cat này chứ product';
                }
                else {
                    await this.catRepository.delete({ id: check_cat.id });
                    return 'Xóa thành công';
                }
            }
            else {
                return 'khong ton tai';
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map