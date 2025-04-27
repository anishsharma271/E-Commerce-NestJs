import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (requiredRole === 'admin') throw new UnauthorizedException(" unauthorized user ")
    if (!requiredRole) return true;
    const { user } = context.switchToHttp().getRequest();
    return user.role === requiredRole;
  }
}
