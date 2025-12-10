import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
