import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy } from './passport/jwt.strategy'
import {RefreshTokenStrategy} from './passport/refreshToken.strategy'
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: (configService.get<string>('JWT_ACCESS_EXPIRED_IN')),
        },
      }),
      inject: [ConfigService],
    }),],
  providers: [AuthService, LocalStrategy,JwtStrategy,RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule { }
