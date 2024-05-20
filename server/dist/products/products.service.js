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
const categories_service_1 = require("../categories/categories.service");
const img_products_service_1 = require("../img_products/img_products.service");
let ProductsService = class ProductsService {
    constructor(categoriesService, imgProductsService, productoRepository) {
        this.categoriesService = categoriesService;
        this.imgProductsService = imgProductsService;
        this.productoRepository = productoRepository;
    }
    async create(createProductDto, id) {
        try {
            const check_name = await this.productoRepository.findOneBy({
                name_product: createProductDto.name_product,
                id: (0, typeorm_2.Not)(id)
            });
            const check_cat = await this.categoriesService.findOne(id);
            if (check_cat) {
                if (check_name) {
                    return 'Đã tồn tại tên sản phẩm này';
                }
                else {
                    createProductDto.cat = check_cat;
                    const result = this.productoRepository.create(createProductDto);
                    await this.productoRepository.save(result);
                    return "Thêm thành công";
                }
            }
            else {
                return "không tồn tại cat";
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        return await this.productoRepository.find();
    }
    findOne(id) {
        return this.productoRepository.findOne({
            relations: ['cat', 'imgs'],
            where: { id: id },
        });
    }
    async update(id, updateProductDto) {
        try {
            const check_id = await this.productoRepository.findOne({ where: { id } });
            if (check_id) {
                const check_name = await this.productoRepository.findOneBy({
                    name_product: updateProductDto.name_product,
                    id: (0, typeorm_2.Not)(id)
                });
                if (!check_name) {
                    const quantity_new = updateProductDto.quantity;
                    updateProductDto.quantity = quantity_new + check_id.quantity;
                    await this.productoRepository.update(id, updateProductDto);
                    return `Đã cập nhật`;
                }
                else {
                    return `Đã tồn tại tên sản phẩm này`;
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
    async remove(id) {
        try {
            const check_id = await this.productoRepository.findOne({ where: { id } });
            if (check_id) {
                if (check_id.is_deleted == true) {
                    check_id.is_deleted = false;
                }
                else {
                    check_id.is_deleted = true;
                }
                await this.productoRepository.update(id, check_id);
                return 'Thao tác thành công';
            }
            else {
                return 'Không tìm thấy sản phẩm';
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async findProductByCat(id, page = 1, limit = 10, check = "new") {
        const skip = (page - 1) * limit;
        let order;
        if (check === 'asc' || check === 'desc') {
            order = { price: check };
        }
        else if (check === 'new') {
            order = { id: 'DESC' };
        }
        const [products, total] = await this.productoRepository.findAndCount({
            relations: ['cat', 'imgs'],
            where: {
                cat: {
                    id: id,
                },
            },
            order,
            skip,
            take: limit,
        });
        return {
            products,
            total,
            currentPage: page,
            perPage: limit,
            lastPage: Math.ceil(total / limit),
        };
    }
    async findProductByName(name, page = 1, limit = 10, check = "new") {
        const skip = (page - 1) * limit;
        let order;
        if (check === 'asc' || check === 'desc') {
            order = { price: check };
        }
        else if (check === 'new') {
            order = { id: 'DESC' };
        }
        const [products, total] = await this.productoRepository.findAndCount({
            relations: ['cat', 'imgs'],
            where: { name_product: (0, typeorm_2.Like)(`%${name}%`) },
            skip,
            take: limit,
            order
        });
        return {
            products,
            total,
            currentPage: page,
            perPage: limit,
            lastPage: Math.ceil(total / limit),
        };
    }
    async updateQuantity(id, quantity) {
        try {
            const check_id = await this.productoRepository.findOneBy({ id });
            if (check_id) {
                check_id.out_quantity += quantity;
                await this.productoRepository.update(id, check_id);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => categories_service_1.CategoriesService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => img_products_service_1.ImgProductsService))),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        img_products_service_1.ImgProductsService,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map