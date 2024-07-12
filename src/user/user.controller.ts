import { UserInfo } from './utils/userInfo.decorator';

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 사용자 정보 조회
   * @param user
   * @returns
   */
  // JWT 인증 유저
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getUserInfo(@UserInfo() user: User) {
    const me = await this.userService.findOneById(user.id);

    return {
      message: '사용자 정보 조회에 성공했습니다.',
      data: me,
    };
  }
}
