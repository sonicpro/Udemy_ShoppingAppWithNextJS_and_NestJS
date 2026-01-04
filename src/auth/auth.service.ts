import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import express from 'express';
import { User } from 'generated/prisma/client.js';
import ms, { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: express.Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.configService.getOrThrow<StringValue>('JWT_EXPIRATION')),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      secure: true, // the cookie is only transmittable through HTTPS.
      httpOnly: true,
      expires: expires,
    });
    return { tokenPayload };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email: email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new BadRequestException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
