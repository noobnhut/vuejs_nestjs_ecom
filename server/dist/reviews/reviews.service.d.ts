import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
export declare class ReviewsService {
    private reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    create(createReviewDto: CreateReviewDto): Promise<CreateReviewDto & Review>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReviewDto: UpdateReviewDto): string;
    remove(id: number): string;
}
