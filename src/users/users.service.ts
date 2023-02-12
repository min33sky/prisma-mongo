import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser() {
    return await this.prisma.user.create({
      data: {
        age: Math.floor(Math.random() * 100),
        height: Math.floor(Math.random() * 100) + 30,
        role: 'USER',
      },
    });
  }
}
