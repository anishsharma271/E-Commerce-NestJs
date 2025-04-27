import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service'; // Assuming you have a user service to fetch user details
export interface JwtPayload {
    sub: string; // User identifier (or any unique identifier for your user)
    role: string; // User's role (admin, user, etc.)
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET, // Use your JWT secret
        });
    }

    async validate(payload: JwtPayload) {
        // console.log('Headers:', payload);
        const user = await this.authService.findById(payload.sub);
        console.log("user", user);

        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        return user; // Return the user object (this will be added to request.user)
    }
}
