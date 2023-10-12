import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JWTPayload } from '../dto/jwt-payload.dto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      secretOrKey: 'secret_KEsdfsdfjkshdfkja2kjh34kj2h3',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const { mobileNumber, id } = payload;
    const user: User = await this.userService.findOne({
      where: { id, mobileNumber },
    });
    if (!user) throw new UnauthorizedException(`User not found!`);

    return user;
  }
}
