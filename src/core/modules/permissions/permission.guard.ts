import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth/public.decorator';
import { User } from '../user/entities/user.entity';
import { PERMISSION_KEY } from './permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    let requiredPermission = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) {
      // use controller and method name as default
      requiredPermission = [
        context
          .getClass()
          .name.toLowerCase()
          .replace(/controller$/, ''),
        context.getHandler().name,
      ].join('.');
    }

    console.log(requiredPermission);

    const { user } = context.switchToHttp().getRequest() as { user: User };

    return (
      user?.permissions?.find((p) => p.name === requiredPermission) !==
      undefined
    );
  }
}
