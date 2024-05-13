import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    // return await this.couponRepository.save(createCouponDto);
    try {
      const check_name = await this.couponRepository.findOneBy({
        coupon_name: createCouponDto.coupon_name,
      });
      if (createCouponDto.coupon_name.length < 0) {
        return 'Không được để trống';
      } else {
        if (check_name) {
          return 'Đã tồn tại mã coupon này';
        } else {
          const coupon = await this.couponRepository.save(createCouponDto);
          return 'Thêm coupon thành công';
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    // return `This action returns all coupons`;
    return this.couponRepository.find();
  }

  findOne(id: number) {
    // return `This action returns a #${id} coupon`;
    return this.couponRepository.findOneBy({id});
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    // return `This action updates a #${id} coupon`;
    try {
      const check_id = await this.couponRepository.findOne({ where: { id } });
      if (check_id) {
        const check_name = await this.couponRepository.findOneBy({
          coupon_name: updateCouponDto.coupon_name,
          id: Not(id),
        });
        if (!check_name) {
          await this.couponRepository.update(id, updateCouponDto);
          return `Đã cập nhật`;
        } else {
          return `Đã tồn tại mã coupon này`;
        }
      } else {
        return `Không tìm thấy coupon`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} coupon`;
    try {
      const check_id = await this.couponRepository.findOne({ where: { id } });
      if (check_id) {
        await this.couponRepository.delete({ id });
        return 'Xóa coupon thành công';
      } else {
        return `Không tìm thấy coupon`;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
