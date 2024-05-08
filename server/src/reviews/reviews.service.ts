import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    // return await this.reviewRepository.save(createReviewDto);
    try {
      const review = await this.reviewRepository.save(createReviewDto);
      return review;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    // return `This action returns all reviews`;
    return this.reviewRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    // return `This action updates a #${id} review`;
    try {
      const review = await this.reviewRepository.update(id, updateReviewDto);
      return review;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} review`;
    try {
      const check_id = await this.reviewRepository.findOne({ where: { id } });
      if (check_id) {
        await this.reviewRepository.delete({ id });
        return 'Xóa coupon thành công';
      } else {
        return 'Không tìm thấy coupon';
      }
    } catch (error) {
      console.log(error);
    }
  }
}
