import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        //   console.log('Request headers:', request.headers); 
        return super.canActivate(context);
    }
}



// {
//     canActivate(context: ExecutionContext) {
//       console.log('JWT Token: ', context.switchToHttp().getRequest().headers['authorization']);
//       return super.canActivate(context);
//     }
//   }
