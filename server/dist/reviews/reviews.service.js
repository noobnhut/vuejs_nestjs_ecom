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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./entities/review.entity");
let ReviewsService = class ReviewsService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async create(createReviewDto) {
        try {
            const review = await this.reviewRepository.save(createReviewDto);
            return review;
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return this.reviewRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} review`;
    }
    async update(id, updateReviewDto) {
        try {
            const review = await this.reviewRepository.update(id, updateReviewDto);
            return review;
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(id) {
        try {
            const check_id = await this.reviewRepository.findOne({ where: { id } });
            if (check_id) {
                await this.reviewRepository.delete({ id });
                return 'Xóa coupon thành công';
            }
            else {
                return 'Không tìm thấy coupon';
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map