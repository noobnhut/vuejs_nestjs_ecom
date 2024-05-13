import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import { OrderDetailsService } from 'src/order_details/order_details.service';

const moment = require('moment');
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private userService: UsersService,
    private configService:ConfigService,
    private orderDetailService:OrderDetailsService,
  ) { }

  async create(createOrderDto: CreateOrderDto, id: number,carts:any) {
    const check_user = await this.userService.findOne(id)
    if (check_user) {
      createOrderDto.user = check_user
      let order = await this.orderRepository.save(createOrderDto);
      for(const cart of carts)
        {
          this.orderDetailService.creates(cart.single_price,cart.quantity,cart.id_product,order)
        }
      
      return 'Mua hàng thành công'
    }
    else {
      return 'Tạo thất bại'
    }

  }

  async createVNP(createOrderDto: CreateOrderDto, id: number, req: any,bank:string,carts:any) {
    const check_user = await this.userService.findOne(id)
    let check_create = false
    if (check_user) {
      createOrderDto.user = check_user
      check_create = true
      let order = await this.orderRepository.save(createOrderDto);
      for(const cart of carts)
        {
          this.orderDetailService.creates(cart.single_price,cart.quantity,cart.id_product,order)
        }
      process.env.TZ = 'Asia/Ho_Chi_Minh';

      let date = new Date();
      let createDate = moment(date).format('YYYYMMDDHHmmss');

      let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      // GET env
      
      let tmnCode = this.configService.get<string>("vnp_TmnCode");
      let secretKey = this.configService.get<string>("vnp_HashSecret")
      let vnpUrl = this.configService.get<string>("vnp_Url")
      let returnUrl = this.configService.get<string>("vnp_ReturnUrl")

      let orderId = moment(date).format('DDHHmmss');
      let amount = createOrderDto.total_order-createOrderDto.total_coupon;
      let bankCode = bank
      let locale = 'vn'
      let currCode = 'VND';
      let vnp_Params = {};
      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = tmnCode;
      vnp_Params['vnp_Locale'] = locale;
      vnp_Params['vnp_CurrCode'] = currCode;
      vnp_Params['vnp_TxnRef'] = orderId;
      vnp_Params['vnp_OrderInfo'] = orderId;
      vnp_Params['vnp_OrderType'] = 'other';
      vnp_Params['vnp_Amount'] = amount * 100;
      vnp_Params['vnp_ReturnUrl'] = returnUrl;
      vnp_Params['vnp_IpAddr'] = ipAddr;
      vnp_Params['vnp_CreateDate'] = createDate;


      if (bankCode !== null && bankCode !== '') {

        vnp_Params['vnp_BankCode'] = bankCode
      }
      vnp_Params = this.sortObject(vnp_Params);

      let querystring = require('qs');
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);

      let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

      return { redirectUrl: vnpUrl, order, check_create }
    }
    else {
      return 'Thất bại'
    }
  }

  async getVNP(query:any)
  {
    try {
      const parsedData = JSON.parse(query);
      let vnp_Params = parsedData
      let secureHash = vnp_Params['vnp_SecureHash'];
      
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];
  
      vnp_Params = this.sortObject(vnp_Params);
  
      let secretKey = this.configService.get<string>("vnp_HashSecret")
  
      let querystring = require('qs');
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        
        return { code: vnp_Params['vnp_ResponseCode'] }
      } else {
        return { code: '97' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  sortObject(obj: any) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

  findAll() {
    return this.orderRepository.find(
      {
        relations: ['user', 'ods', 'ods.product'],
      }
    )
  }

  findOne(id: number) {
    return this.orderRepository.findOneBy({id});
  }

  async update(id: number, updateOrderDto: UpdateOrderDto,check_create:Boolean) {
   const check = await this.findOne(id)
   if(check)
    {
      check.status = OrderStatus.DaThanhToan
      check.vnp_orderID = updateOrderDto.vnp_orderID
      check.total_bank = updateOrderDto.total_bank
      check.date_bank = updateOrderDto.date_bank
      await this.orderRepository.update(id,check)
      return 'xong'
    }
    else
    {
      return 'Không tồn tại hóa đơn'
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

export enum OrderStatus {
  DaGiaoHang = "Đã giao hàng",
  DaDat = "Đã đặt",
  DaThanhToan = "Đã thanh toán",
  DangGiao = "Đang giao hàng",
  DaHuy = "Đã hủy",
}
