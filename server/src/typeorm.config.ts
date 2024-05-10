import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity'
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { ImgProduct } from './img_products/entities/img_product.entity';
import { Favourite } from './favourites/entities/favourite.entity';
import { Coupon } from './coupons/entities/coupon.entity';
import { Order } from './orders/entities/order.entity';
import { OrderDetail } from './order_details/entities/order_detail.entity';
import { Review } from './reviews/entities/review.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 3306),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD', ''),
          database: configService.get<string>('DB_DATABASE', 'ecom'),
          entities: [User,Category,Product,ImgProduct,Favourite,Coupon,Order,OrderDetail,Review ], // Thêm các entities của bạn vào đây
          // synchronize: true, // Chỉ dùng trong môi trường dev
        }),
        inject: [ConfigService],
      }),
  ],
})
export class CustomTypeOrmModule {}