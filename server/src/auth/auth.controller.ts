import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Role } from 'src/users/entities/user.entity';
import { RolesGuard } from './role/roles.guard';
import { HasRoles } from './role/has-roles.decorator';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user,response);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('admin')
    onlyAdmin(@Request() req) {
        return req.user;
    }

    @HasRoles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('user')
    onlyUser(@Request() req) {
        return req.user;
    }
}
