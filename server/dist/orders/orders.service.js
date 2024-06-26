"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const order_details_service_1 = require("../order_details/order_details.service");
const mail_service_1 = require("../mail/mail.service");
const moment = require('moment');
let OrdersService = class OrdersService {
    constructor(orderRepository, userService, configService, orderDetailService, mailService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.configService = configService;
        this.orderDetailService = orderDetailService;
        this.mailService = mailService;
    }
    async create(createOrderDto, id, carts) {
        const check_user = await this.userService.findOne(id);
        if (check_user) {
            createOrderDto.user = check_user;
            let order = await this.orderRepository.save(createOrderDto);
            for (const cart of carts) {
                this.orderDetailService.creates(cart.single_price, cart.quantity, cart.id_product, order);
            }
            let html = `
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
      
      `;
            this.mailService.sendMail(check_user.email, '404NFP Keyboard', html);
            return { order };
        }
        else {
            return 'Tạo thất bại';
        }
    }
    async createVNP(createOrderDto, id, req, bank, carts) {
        const check_user = await this.userService.findOne(id);
        let check_create = false;
        if (check_user) {
            createOrderDto.user = check_user;
            check_create = true;
            let order = await this.orderRepository.save(createOrderDto);
            for (const cart of carts) {
                this.orderDetailService.creates(cart.single_price, cart.quantity, cart.id_product, order);
            }
            process.env.TZ = 'Asia/Ho_Chi_Minh';
            let date = new Date();
            let createDate = moment(date).format('YYYYMMDDHHmmss');
            let ipAddr = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            let tmnCode = this.configService.get("vnp_TmnCode");
            let secretKey = this.configService.get("vnp_HashSecret");
            let vnpUrl = this.configService.get("vnp_Url");
            let returnUrl = this.configService.get("vnp_ReturnUrl");
            let orderId = moment(date).format('DDHHmmss');
            let amount = createOrderDto.total_order - createOrderDto.total_coupon;
            let bankCode = bank;
            let locale = 'vn';
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
                vnp_Params['vnp_BankCode'] = bankCode;
            }
            vnp_Params = this.sortObject(vnp_Params);
            let querystring = require('qs');
            let signData = querystring.stringify(vnp_Params, { encode: false });
            let crypto = require("crypto");
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
            console.log(order);
            return { redirectUrl: vnpUrl, order, check_create };
        }
        else {
            return 'Thất bại';
        }
    }
    async getVNP(query) {
        try {
            const parsedData = JSON.parse(query);
            let vnp_Params = parsedData;
            let secureHash = vnp_Params['vnp_SecureHash'];
            delete vnp_Params['vnp_SecureHash'];
            delete vnp_Params['vnp_SecureHashType'];
            vnp_Params = this.sortObject(vnp_Params);
            let secretKey = this.configService.get("vnp_HashSecret");
            let querystring = require('qs');
            let signData = querystring.stringify(vnp_Params, { encode: false });
            let crypto = require("crypto");
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
            if (secureHash === signed) {
                return { code: vnp_Params['vnp_ResponseCode'] };
            }
            else {
                return { code: '97' };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    sortObject(obj) {
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
        return this.orderRepository.find({
            relations: ['user', 'ods', 'ods.product'],
        });
    }
    findOne(id) {
        return this.orderRepository.findOneBy({ id });
    }
    async update(id, updateOrderDto, check_create) {
        const check = await this.orderRepository.findOne({
            relations: ['user'],
            where: { id: id }
        });
        if (check) {
            if (check_create === "true") {
                check.status = OrderStatus.DaThanhToan;
                check.vnp_orderID = updateOrderDto.vnp_orderID;
                check.total_bank = updateOrderDto.total_bank;
                check.date_bank = updateOrderDto.date_bank;
                await this.orderRepository.update(id, check);
                let html = `
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
        
        `;
                this.mailService.sendMail(check.user.email, '404NFP Keyboard', html);
                return 'Thanh toán thành công';
            }
            else {
                return 'Đơn hàng đã thanh toán';
            }
        }
        else {
            return 'Không tồn tại hóa đơn hoặc đã thanh toán thành công';
        }
    }
    async remove(id, check) {
        try {
            const check_id = await this.orderRepository.findOneBy({ id });
            if (check == "HUY" && check_id) {
                check_id.status = OrderStatus.ThatBai;
                this.orderRepository.update(id, check_id);
                return 'Xong';
            }
            else if (check == "HUY_2" && check_id) {
                if (check_id.status == OrderStatus.DaDat) {
                    check_id.status = OrderStatus.DaHuy;
                    this.orderRepository.update(id, check_id);
                    return 'Hủy thành công';
                }
                else if (check_id.status == OrderStatus.DangGiao ||
                    check_id.status == OrderStatus.DaGiaoHang ||
                    check_id.status == OrderStatus.DaThanhToan) {
                    return 'Đơn hàng không thể hủy,vui lòng liên hệ CSKH';
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateOrderStatus(id) {
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
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        config_1.ConfigService,
        order_details_service_1.OrderDetailsService,
        mail_service_1.MailService])
], OrdersService);
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DaGiaoHang"] = "\u0110\u00E3 giao h\u00E0ng";
    OrderStatus["DaDat"] = "\u0110\u00E3 \u0111\u1EB7t";
    OrderStatus["DaThanhToan"] = "\u0110\u00E3 thanh to\u00E1n";
    OrderStatus["DangGiao"] = "\u0110ang giao h\u00E0ng";
    OrderStatus["DaHuy"] = "\u0110\u00E3 h\u1EE7y";
    OrderStatus["ThatBai"] = "Thanh to\u00E1n th\u1EA5t b\u1EA1i";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
//# sourceMappingURL=orders.service.js.map