import _ from 'lodash';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /** 회원가입 **/
  async signUp(email: string, password: string, nickname: string) {
    // email 중복 여부 확인
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다.',
      );
    }

    // bcrypt 활용하여 password 해싱하여 저장
    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  /** 로그인 **/
  async signIn(email: string, password: string) {
    // password 포함하여 user 정보 가져오기
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    // 입력한 email로 가입된 회원이 존재하지 않을 때
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    // password 불일치 시
    // bcrypt의 compare 함수 통해 password 비교. 일치 시 JWT를 accessToken으로 발급
    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요');
    }

    // payload가 email을 담고 있음
    const payload = { email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // jwt.strategy.ts 에서 findByEmail 사용
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
