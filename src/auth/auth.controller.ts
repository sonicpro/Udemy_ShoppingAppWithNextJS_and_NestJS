import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { CurrentUser } from './current-user.decorator.js';
import type { User } from 'generated/prisma/client.js';
import express from 'express';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // user property extracted by CurrentUser decorator is put to Request object by LocalAuthGuard's PassportStrategy.
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    return this.authService.login(user, response);
  }
}
