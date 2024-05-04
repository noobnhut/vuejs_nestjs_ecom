import { PartialType } from '@nestjs/mapped-types';
import { CreateImgProductDto } from './create-img_product.dto';

export class UpdateImgProductDto extends PartialType(CreateImgProductDto) {}
