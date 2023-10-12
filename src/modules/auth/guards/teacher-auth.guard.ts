import {
  Logger,
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JWTPayload } from '../dto/jwt-payload.dto';

@Injectable()
export class TeacherAuthGuard implements CanActivate {
  private readonly logger = new Logger(TeacherAuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.getArgByIndex(2).req;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JWTPayload = await this.jwtService.verifyAsync(token, {
        secret: 'secret_KEsdfsdfjkshdfkja2kjh34kj2h3',
      });

      request['teacher'] = payload;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
