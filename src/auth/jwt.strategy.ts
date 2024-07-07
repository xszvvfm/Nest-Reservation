/** Passport 패키지를 활용하여 JWT 발급 및 검증 **/

import _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      // JWT 토큰 추출. Bearer 뒤의 {JWT} 값 (실제 token값)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  // 검증 로직
  // validate 함수에서 유저 서비스의 함수 이용해 실제로 있는 유저인지 체크. 유저가 없으면 인증에 실패, 그렇지 않으면 인증 처리
  async validate(payload: any) {
    // TODO. payload로 전달된 데이터를 통해 실제 유저 정보를 조회해야 해요!
    // JWT 검증 자체는 통과했으나, 검증한 데이터 자체의 오류 존재할 수 있음. payload로 전달된 데이터가 진짜 존재하는지 확인 후, 존재 시 통과
    const user = await this.authService.findByEmail(payload.email);
    if (_.isNil(user)) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }

    return user;
  }
}
