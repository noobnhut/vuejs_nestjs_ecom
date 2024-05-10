import { BadGatewayException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms = require('ms');
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch === true) {
        return user
      }
    }
    return null;
  }

  async login(user: any, response: Response) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    // tạo refresh_token
    const refresh_token = this.createRefreshToken(payload)

    // update user refresh token 
    this.updateUserToken(refresh_token, user.id)

    // set cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRED_IN")),
    })

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
      user: {
        id:user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role
      }
    };
  }

  createRefreshToken = (payload) => {
    const refresh_token = this.jwtService.sign(payload,
      {
        secret: this.configService.get(<string>("JWT_REFRESH_SECRET")),
        expiresIn: ms(this.configService.get<string>("JWT_REFRESH_EXPIRED_IN")) / 1000,
      }
    )
    return refresh_token
  }

  updateUserToken = (token: string, id: number) => {
    this.usersService.updateUserToken(token, id)
  }

  processNewToken = async (refresh_token: string, response: Response) => {
    try {

      this.jwtService.verify(refresh_token,
        {
          secret: this.configService.get(<string>("JWT_REFRESH_SECRET"))
        }
      )
      let user = await this.usersService.findUserByToken(refresh_token)
      if (user) {
        // update refresh_token
        response.clearCookie("refresh_token")
        return this.login(user, response)
      }
      else {
        throw new BadGatewayException(`Chỗ này có vaasnd dề`)
      }
    } catch (error) {
      // xử lý lỗi 1 trong 2, 1 là refresh token hết date 2 là sai định dạng từ jwt
      throw new BadGatewayException(`Refresh token không hợp lệ, Vui lòng login lại`)
    }
  }

  logout = async (id:number, responsse: Response) => {
    await this.usersService.updateUserToken(null,id);
    responsse.clearCookie("refresh_token")
    return "ok"
  }
}


