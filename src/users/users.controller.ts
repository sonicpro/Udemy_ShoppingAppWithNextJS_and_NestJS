import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request.js';
import { UsersService } from './users.service.js';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
