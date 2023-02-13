import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
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

  @Post('search')
  async createKeyword(@Body() body) {
    return this.postsService.createKeyword(body.keyword);
  }

  @Patch('search')
  async addAndSearch(@Body() body, @Query('before') before: string) {
    return this.postsService.addAndSearch(body.keyword, before);
  }

  @Get('search')
  async getResult(@Query('keyword') keyword: string) {
    return this.postsService.getResult(keyword);
  }
}
