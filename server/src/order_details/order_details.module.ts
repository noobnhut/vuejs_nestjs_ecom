import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { ProductsModule } from 'src/products/products.module';
@Module({
  imports:[TypeOrmModule.forFeature([OrderDetail]),ProductsModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports:[OrderDetailsService]
})
export class OrderDetailsModule {}
