import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phone',
    });
  }

  async validate(phone: string, password: string): Promise<any> {
    console.log(111);
    // const user = await this.authService.signIn({ phone, password });
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    console.log('local', phone, password);
    const user = await this.authService.validateUser({ phone, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
