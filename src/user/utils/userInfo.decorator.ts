/** 유저 정보 (userInfo) 담기 위한 커스텀 데코레이터 **/
// 로그인 해야 호출할 수 있는 API에서 사용될 것

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // request 접근
    const request = ctx.switchToHttp().getRequest();
    // request.user 존재하면 userInfo 넘기고 없으면 null로 반환
    return request.user ? request.user : null;
  },
);
