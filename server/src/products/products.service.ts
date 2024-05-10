import { Inject, Injectable,forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';


@Injectable()
export class ProductsService {
  constructor(
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Product)
    private productoRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto, id: number) {
    try {
      const check_name = await this.productoRepository.findOneBy({name_product: createProductDto.name_product})
      // check cat tồn tại
      const check_cat =  await this.categoriesService.findOne(id)
      if(check_cat)
        {
          if(check_name){
            return 'Đã tồn tại tên sản phẩm này'
          }else{
            // createProductDto.cat = cat;
            const result = this.productoRepository.create(createProductDto)
            await this.productoRepository.save(result)
            return "Thêm thành công";
          }
        }
        else
        {
          return "không tồn tại cat";

        }
      
      
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    // return `This action returns all products`;
    return this.productoRepository.find();
  }

  findOne(id: number) {
    return this.productoRepository.findOneBy({id:id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // return `This action updates a #${id} product`;
    try {
      const check_id = await this.productoRepository.findOne({where: {id}});
      if(check_id){
        const check_name = await this.productoRepository.findOneBy({name_product: updateProductDto.name_product})
        if(!check_name){
          await this.productoRepository.update(id, updateProductDto);
          return `Đã cập nhật`
        }else{
          return `Đã tồn tại tên sản phẩm này`
        }
      }else{
        return `Không tìm thấy sản phẩm`
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} product`;
    try {
      const check_id = await this.productoRepository.findOne({ where: {id}})
      if(check_id){
        await this.productoRepository.delete({ id });
        return 'Xóa sản phẩm thành công';
      }else{
        return 'Không tìm thấy sản phẩm';
      }
      
    } catch (error) {
      console.log(error);
    }
  } 

  findProductByCat(id:number)
  {
    return this.productoRepository.find({
      relations:['cat'],
      where:{cat:{id:id}}
    })
  }

}
