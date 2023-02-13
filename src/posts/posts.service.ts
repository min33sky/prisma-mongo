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

  /**
   * 검색어 저장
   * @param keyword 검색어
   */
  async createKeyword(keyword: string) {
    const exKeyword = await this.prisma.search.findUnique({
      where: {
        keyword,
      },
    });

    if (exKeyword) {
      return exKeyword;
    }

    return await this.prisma.search.create({
      data: {
        keyword,
      },
    });
  }

  /**
   * 연관 검색어 추가
   * @param keyword 검색어
   * @param before 이전에 검색한 검색어 (어떤 검색어를 통해서 왔는가 판단)
   */
  async addAndSearch(keyword: string, before: string) {
    return this.prisma.$transaction(async (ctx) => {
      return ctx.search.update({
        where: {
          keyword,
        },
        data: {
          keywords: {
            push: before, // keywords 배열에 before를 추가
          },
        },
      });
    });
  }

  async getResult(keyword: string) {
    const data = await this.prisma.search.findMany({
      where: {
        keywords: {
          has: keyword, // 배열에서 찾을 때는 has를 사용
        },
      },
    });

    //? 연관 검색어에 있거나 키워드가 일치할 경우일 때
    const result = await this.prisma.search.findMany({
      where: {
        OR: [
          {
            // 키워드들 중에 있는 경우
            keyword: {
              in: data.map((d) => d.keyword),
            },
          },
          {
            // 연관 검색어들 중에 있는 경우
            keywords: {
              hasSome: data.map((d) => d.keyword),
            },
          },
        ],
      },
    });

    return result.map((r) => r.keyword); // 키워드만 반환
  }
}
