import { createParamDecorator, ExecutionContext } from "@nestjs/common";

type ReqUser = {
  id: number;
  email: string;
  roles: string[];
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ReqUser | undefined => {
    const req = ctx.switchToHttp().getRequest<Request & { user?: ReqUser }>();
    return req.user;
  },
);

