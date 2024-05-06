import { Injectable } from '@nestjs/common';
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
    const maxAgeNumber = Number(ms(this.configService.get<string>("JWT_REFRESH_EXPIRED_IN")));
     response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: maxAgeNumber
    })

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
      user: {
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
        expiresIn: ms(this.configService.get(<string>("JWT_REFRESH_EXPIRED_IN"))/1000),
      }
    )
    return refresh_token
  }


  updateUserToken = (token: string, id: number) => {
    this.usersService.updateUserToken(token, id)
  }

}


