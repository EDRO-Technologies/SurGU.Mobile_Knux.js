import { Body, Controller, Param } from '@nestjs/common';
// Hello Wprld!
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Get, UseGuards, Req, Post} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SocialUser } from './types/socialUser';
import { HttpException, HttpStatus } from '@nestjs/common'
import { Protected } from './auth-protected.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  authGoogle() {}

  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  authYandex() {}

  @Get('weeek/:token')
  async weekLogin(@Param('token') token: string) {

    try {
      const socialUser = await this.authService.weeekLogin(token);
      return this.authService.socialLogin(socialUser);
    } catch {
      throw new HttpException("Week user not found", HttpStatus.FORBIDDEN);
    }

  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  authGoogleCallback(@Req() req) {
    if (!req.user)
      throw new HttpException("No user from google", HttpStatus.FORBIDDEN);

    

    return this.authService.socialLogin(new SocialUser(req.user));

  }

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  authYandexCallback(@Req() req) {
    if (!req.user)
      throw new HttpException("No user from yandex", HttpStatus.FORBIDDEN);

    return this.authService.socialLogin(new SocialUser(req.user));
  }

  @Get('hello')
  @UseGuards(Protected)
  test(@Req() req) {
    return 'Hello';
  }

  @Get("user")
  @UseGuards(Protected)
  getCurrentuser(@Req() req) {
    return req.user;
  } 
}
