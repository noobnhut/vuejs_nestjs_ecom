import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {CustomTypeOrmModule} from './typeorm.config'
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ImgProductsModule } from './img_products/img_products.module';
import { FavouritesModule } from './favourites/favourites.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { CouponsModule } from './coupons/coupons.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    CustomTypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    ImgProductsModule,
    FavouritesModule,
    OrdersModule,
    OrderDetailsModule,
    CouponsModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
