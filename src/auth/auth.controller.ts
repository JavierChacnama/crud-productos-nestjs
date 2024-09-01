import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorators';
import { ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: { email: string; role: string };
}
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }

    // @Get('profile')
    // @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(
    //   @Req()
    //   req: RequestWithUser,
    // ) {
    //   return req.user;
    // }

    @Get('profile')
    @Auth(Role.ADMIN)
    profile(
      @Req()
      req: RequestWithUser,
    ) {
      return this.authService.profile(req.user);
    }
}
