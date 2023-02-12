import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(payload) {
    const newPost = await this.prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        comments: payload.comments,
        writerId: payload.writerId,
      },
    });

    return newPost;
  }
}
