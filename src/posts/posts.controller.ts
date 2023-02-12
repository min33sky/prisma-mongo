import { Body, Controller, Post } from '@nestjs/common';
import { PostEntity } from './entity/post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() body) {
    const payload = new PostEntity.Builder()
      .writerId(body.writerId)
      .comments(body.comments)
      .build();

    return this.postsService.createPost(payload);
  }
}
