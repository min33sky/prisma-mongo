import { ObjectId } from 'bson';
import { UserEntity } from 'src/users/entity/user.entity';

export class PostEntity {
  postId?: ObjectId;
  title?: string;

  writer?: UserEntity;
  writerId?: ObjectId;

  comments: Array<{
    userId: ObjectId;
    content: string;
    createdAt: Date;
  }>;

  constructor(
    postId: ObjectId,
    title: string,
    writer: UserEntity,
    writerId: ObjectId,
    comments: Array<{
      userId: ObjectId;
      content: string;
      createdAt: Date;
    }>,
  ) {
    if (postId) this.postId = postId;
    if (title) this.title = title;
    if (writer) this.writer = writer;
    if (writerId) this.writerId = writerId;
    if (comments) this.comments = comments;
  }

  static Builder = class {
    _postId?: ObjectId;
    _title?: string;
    _writer?: UserEntity;
    _writerId?: ObjectId;
    _comments?: Array<{
      userId: ObjectId;
      content: string;
      createdAt: Date;
    }>;

    postId(postId: ObjectId) {
      this._postId = postId;
      return this;
    }

    title(title: string) {
      this._title = title;
      return this;
    }

    writer(writer: UserEntity) {
      this._writer = writer;
      return this;
    }

    writerId(writerId: ObjectId) {
      this._writerId = writerId;
      return this;
    }

    comments(
      comments: Array<{
        userId: ObjectId;
        content: string;
        createdAt: Date;
      }>,
    ) {
      this._comments = comments.map((comment) => {
        return {
          userId: comment.userId,
          content: comment.content,
          createdAt: comment.createdAt,
        };
      });
      return this;
    }

    build() {
      return new PostEntity(
        this._postId,
        this._title,
        this._writer,
        this._writerId,
        this._comments,
      );
    }
  };
}
