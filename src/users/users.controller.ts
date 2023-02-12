import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() body) {
    const payload = new UserEntity.Builder()
      .age(body.age)
      .height(body.height)
      .role(body.role)
      .build();

    return payload;

    // return await this.userService.createUser();
  }
}
