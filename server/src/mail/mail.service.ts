// mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService,) {
    
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.configService.get<string>("YOUR_EMAIL_ADDRESS"), // email của bạn
        pass: this.configService.get<string>("YOUR_EMAIL_PASSWORD"), // mật khẩu email của bạn
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
   
    const mailOptions = {
      from: '"404NFP" <manfromhell2000@gmail.com>', // Địa chỉ gửi mail
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
}
