import { UserInfo } from 'src/user/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 회원가입 **/
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const newUser = await this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
      signUpDto.nickname,
    );

    return {
      message: '회원가입에 성공했습니다.',
      data: newUser,
    };
  }

  /** 로그인 **/
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return {
      message: '로그인에 성공했습니다.',
      data: user,
    };
  }

  // JWT 인증된 유저만 getEmail API 호출할 수 있음
  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
