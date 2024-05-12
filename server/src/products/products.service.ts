import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { ImgProductsService } from 'src/img_products/img_products.service';


@Injectable()
export class ProductsService {
  constructor(
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => ImgProductsService))
    private readonly imgProductsService: ImgProductsService,
    @InjectRepository(Product)
    private productoRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto, id: number) {
    try {
      const check_name = await this.productoRepository.findOneBy({
        name_product: createProductDto.name_product,
        id: Not(id)
      })
      // check cat tồn tại
      const check_cat = await this.categoriesService.findOne(id)
      if (check_cat) {
        if (check_name) {
          return 'Đã tồn tại tên sản phẩm này'
        } else {
          createProductDto.cat = check_cat;
          const result = this.productoRepository.create(createProductDto)
          await this.productoRepository.save(result)
          return "Thêm thành công";
        }
      }
      else {
        return "không tồn tại cat";

      }


    } catch (error) {
      console.log(error)
    }
  }

  // async findAll(page: number = 1, limit: number = 2) {
  //   const skip = (page - 1) * limit;
  //   const [products, total] = await this.productoRepository.findAndCount({
  //     skip,
  //     take: limit,
  //   });
  //   return {
  //     products,
  //     total,
  //     currentPage: page,
  //     perPage: limit,
  //     lastPage: Math.ceil(total / limit),
  //   };
  // }

  async findAll() {
    return await this.productoRepository.find()
  }

  findOne(id: number) {
    return this.productoRepository.findOne({
      relations: ['cat', 'imgs'],
      where: { id: id },
    });
  }

  // có cần đổi danh mục ko ? // không
  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const check_id = await this.productoRepository.findOne({ where: { id } });
      if (check_id) {
        const check_name = await this.productoRepository.findOneBy({
          name_product: updateProductDto.name_product,
          id: Not(id)
        })
        if (!check_name) {
          await this.productoRepository.update(id, updateProductDto);
          return `Đã cập nhật`
        } else {
          return `Đã tồn tại tên sản phẩm này`
        }
      } else {
        return `Không tìm thấy sản phẩm`
      }
    } catch (error) {
      console.log(error);
    }
  }

  // vui long xóa ảnh ?
  async remove(id: number) {
    try {
      const check_id = await this.productoRepository.findOne({ where: { id } })
      if (check_id) {
        const cats = await this.imgProductsService.findByProduct(id);
        if (cats.length > 0) {
          for (const cat of cats) {
            await this.imgProductsService.remove(cat.id);
          }
          await this.productoRepository.delete({ id });
          return 'Xóa sản phẩm thành công';
        } else {
          await this.productoRepository.delete({ id });
          return 'Xóa sản phẩm thành công';
        }
      } else {
        return 'Không tìm thấy sản phẩm';
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findProductByCat(id: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [products, total] = await this.productoRepository.findAndCount({
      relations: ['cat', 'imgs'],
      where: {
        cat: { id: id },
      },
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

  findProductByName(name: string) {
    return this.productoRepository.find({

      where: { name_product: Like(`%${name}%`) }
    })
  }
}
