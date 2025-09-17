import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

export type ReqUser = {
  id: number;
  email: string;
  roles?: string[];
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [];

    if (required.length === 0) return true;

    const req = context.switchToHttp().getRequest<Request & { user?: ReqUser }>();

    const userRoles = req.user?.roles ?? [];
    return required.some((role) => userRoles.includes(role));
  }
}
