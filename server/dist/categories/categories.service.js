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
let CategoriesService = class CategoriesService {
    constructor(catRepository) {
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
                return cat;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.catRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} category`;
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
                    return `Đã tồn tại tên cat này`;
                }
            }
            else {
                return `Không tìm thấy cat`;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(id) {
        try {
            const check_id = await this.catRepository.findOne({ where: { id } });
            if (check_id) {
                await this.catRepository.delete({ id });
                return 'Xóa danh mục thành công';
            }
            else {
                return 'không tìm thấy danh mục';
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
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map