import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImgProduct } from './entities/img_product.entity';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
const streamifier = require('streamifier');

import { ProductsService } from 'src/products/products.service';
@Injectable()
export class ImgProductsService {
  constructor(
    @InjectRepository(ImgProduct)
    private imgProductRepository: Repository<ImgProduct>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService
  ) { }

  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async create(createImgProductDto: CreateImgProductDto, file: Express.Multer.File, id: number) {
    try {
      const add_img = await this.uploadFile(file)
      const product = await this.productsService.findOne(id)
      if (product) {
        createImgProductDto.img_public_key = add_img.public_id
        createImgProductDto.img_url = add_img.url
        createImgProductDto.product = product
        const result = this.imgProductRepository.create(createImgProductDto)
        return this.imgProductRepository.save(result)
      }
      else {
        return { message: 'Không tồn tại sản phẩm' }
      }
    } catch (error) {
      console.log(error)
    }

  }

  findAll() {
    return `This action returns all imgProducts`;
  }

  findOne(id: number) {
    try {
      return this.imgProductRepository.findOneBy({id});
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateImgProductDto: UpdateImgProductDto) {
    return `This action updates a #${id} imgProduct`;
  }

  async remove(id: number) {
    try {
      const check_img = await this.imgProductRepository.findOneBy({ id: id })
      if (check_img) {
        cloudinary.api
          .delete_resources([check_img.img_public_key],
            { type: 'upload', resource_type: 'image' })
          .then(console.log);
        await this.imgProductRepository.delete(check_img)
        return { message: 'Xóa thành công rùi nè' }
      }
      else {
        return { message: 'Không tồn tại ảnh này' }
      }

    } catch (error) {
      console.log(error)
    }
  }

  findByProduct(id:number)
  {
    return this.imgProductRepository.find({
      relations:['product'],
      where:{product:{id:id}}
    })
  }
}
