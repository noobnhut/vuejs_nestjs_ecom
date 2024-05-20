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
import { MailService } from 'src/mail/mail.service';

const moment = require('moment');
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private userService: UsersService,
    private configService: ConfigService,
    private orderDetailService: OrderDetailsService,
    private mailService: MailService
  ) { }

  async create(createOrderDto: CreateOrderDto, id: number, carts: any) {
    const check_user = await this.userService.findOne(id)
    if (check_user) {
      createOrderDto.user = check_user
      let order = await this.orderRepository.save(createOrderDto);
      for (const cart of carts) {
        this.orderDetailService.creates(cart.single_price, cart.quantity, cart.id_product, order)
      }

      let html: string = `
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <section class=" px-4 flex flex-col bg-gray-300 rounded-r-3xl">
          
          <section>
            <h1 class="font-bold text-2xl">Chân thành cảm ơn</h1>
            <article class="mt-8 text-gray-500 leading-7 tracking-wider">
              <p>Chào bạn,${check_user.fullname}</p>
              <p>
                404NFP chân thành cảm ơn bạn đã lựa chọn tin tưởng 404NFP và đặt mua sản phẩm của chúng tôi. <br>
                Hy vọng rằng chất lượng mà sản phẩm mang lại sẽ làm bạn cảm thấy hài lòng.<br>
                 404NFP mong rằng sẽ được tiếp tục đồng hành cùng bạn trong những lần mua sắm sắp tới.
              </p>
              <footer class="mt-12">
                <p>Chân thành cảm ơn</p>
                <p>404NFP</p>
              </footer>
              <img src="https://res.cloudinary.com/dgnsgobj6/image/upload/v1715396106/bjha0n74cwvjf1exegon.png" alt="hình ảnh" style="max-width: 100%; height: auto; margin-bottom: 20px;">
            </article>
         
          </section>
          
        </section>
      </body>
    </html>
      
      `
      this.mailService.sendMail(check_user.email, '404NFP Keyboard', html)
      return { order }
    }
    else {
      return 'Tạo thất bại'
    }

  }

  async createVNP(createOrderDto: CreateOrderDto, id: number, req: any, bank: string, carts: any) {
    const check_user = await this.userService.findOne(id)
    let check_create = false
    if (check_user) {
      createOrderDto.user = check_user
      check_create = true
      let order = await this.orderRepository.save(createOrderDto);
      for (const cart of carts) {
        this.orderDetailService.creates(cart.single_price, cart.quantity, cart.id_product, order)
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
      let amount = createOrderDto.total_order - createOrderDto.total_coupon;
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
      console.log(order)
      return { redirectUrl: vnpUrl, order, check_create }
    }
    else {
      return 'Thất bại'
    }
  }

  async getVNP(query: any) {
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
    return this.orderRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, check_create: string) {
    const check = await this.orderRepository.findOne({
      relations: ['user'],
      where: { id: id }
    })
    if (check) {
      if (check_create === "true") {
        check.status = OrderStatus.DaThanhToan
        check.vnp_orderID = updateOrderDto.vnp_orderID
        check.total_bank = updateOrderDto.total_bank
        check.date_bank = updateOrderDto.date_bank
        await this.orderRepository.update(id, check)

        let html: string = `
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <section class=" px-4 flex flex-col bg-gray-300 rounded-r-3xl">
            
            <section>
              <h1 class="font-bold text-2xl">Chân thành cảm ơn</h1>
              <article class="mt-8 text-gray-500 leading-7 tracking-wider">
                <p>Chào bạn,${check.user.fullname}</p>
                <p>
                  404NFP chân thành cảm ơn bạn đã lựa chọn tin tưởng 404NFP và đặt mua sản phẩm của chúng tôi. <br>
                  Hy vọng rằng chất lượng mà sản phẩm mang lại sẽ làm bạn cảm thấy hài lòng.<br>
                   404NFP mong rằng sẽ được tiếp tục đồng hành cùng bạn trong những lần mua sắm sắp tới.
                </p>
                <footer class="mt-12">
                  <p>Chân thành cảm ơn</p>
                  <p>404NFP</p>
                </footer>
                <img src="https://res.cloudinary.com/dgnsgobj6/image/upload/v1715396106/bjha0n74cwvjf1exegon.png" alt="hình ảnh" style="max-width: 100%; height: auto; margin-bottom: 20px;">
              </article>
           
            </section>
            
          </section>
        </body>
      </html>
        
        `
        this.mailService.sendMail(check.user.email, '404NFP Keyboard', html)
        return 'Thanh toán thành công'
      }
      else {
        return 'Đơn hàng đã thanh toán'
      }

    }
    else {
      return 'Không tồn tại hóa đơn hoặc đã thanh toán thành công'
    }
  }

  // chuyển đơn hàng -> đã hủy
  async remove(id: number, check: string) {
    try {
      const check_id = await this.orderRepository.findOneBy({ id })
      if (check == "HUY" && check_id) {
        check_id.status = OrderStatus.ThatBai
        this.orderRepository.update(id, check_id)
        return 'Xong'
      }
      else if (check == "HUY_2" && check_id) {
        // nếu đơn hàng đã đặt -> đc hủy
        if (check_id.status == OrderStatus.DaDat) {
          check_id.status = OrderStatus.DaHuy
          this.orderRepository.update(id, check_id)
          return 'Hủy thành công'
        }
         // nếu đơn hàng đang giao hàng && đã giao hàng => ko đc hủy
        // nếu đơn hàng đã thanh toán => ko đc hủy và nội dung: vui long liên hệ vs store
        else if (
          check_id.status == OrderStatus.DangGiao ||
          check_id.status == OrderStatus.DaGiaoHang ||
          check_id.status == OrderStatus.DaThanhToan) {
          return 'Đơn hàng không thể hủy,vui lòng liên hệ CSKH'
        }
       
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateOrderStatus(id: number) {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        return 'Không tồn tại hóa đơn';
      }
  
      switch (order.status) {
        case OrderStatus.DaDat:
        case OrderStatus.DaThanhToan:
          order.status = OrderStatus.DangGiao;
          await this.orderRepository.update(id, order);
          return 'Cập nhập đang giao hàng';
        
        case OrderStatus.DangGiao:
          order.status = OrderStatus.DaGiaoHang;
          await this.orderRepository.update(id, order);
          return 'Cập nhập đã giao hàng';
        
        default:
          return 'Không tồn tại';
      }
    } catch (error) {
      console.log(error);
    }
  }
  
}

export enum OrderStatus {
  DaGiaoHang = "Đã giao hàng",
  DaDat = "Đã đặt",
  DaThanhToan = "Đã thanh toán",
  DangGiao = "Đang giao hàng",
  DaHuy = "Đã hủy",
  ThatBai = "Thanh toán thất bại"
}
