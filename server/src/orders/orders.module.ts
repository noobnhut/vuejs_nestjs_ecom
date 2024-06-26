import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { OrderDetailsModule } from 'src/order_details/order_details.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    OrderDetailsModule,
    MailModule
    ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
