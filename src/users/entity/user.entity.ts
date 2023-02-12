type ObjectId = string;
type Int = number;
type Float = number;

export enum ERole {
  USER = ' USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export class UserEntity {
  userId: ObjectId;
  age: Int;
  createdAt: Date;
  height: Float;
  role: ERole;

  constructor(
    userId: ObjectId,
    age: Int,
    createdAt: Date,
    height: Float,
    role: ERole,
  ) {
    this.userId = userId;
    this.age = age;
    this.createdAt = createdAt;
    this.height = height;
    this.role = role;
  }

  static Builder = class {
    _userId?: ObjectId;
    _age?: Int;
    _createdAt?: Date;
    _height?: Float;
    _role?: ERole;

    userId(userId: ObjectId) {
      this._userId = userId;
      return this;
    }

    age(age: Int | string) {
      if (typeof age === 'string') age = parseInt(age);
      if (typeof age === 'number' && age > 0) {
        this._age = age;
      } else {
        this._age = 0;
      }

      return this;
    }

    createdAt(createdAt: Date) {
      this._createdAt = createdAt;
      return this;
    }

    height(height: Float) {
      if (typeof height === 'number' && height > 0) {
        this._height = height;
      } else {
        this._height = 0;
      }

      return this;
    }

    role(role: ERole) {
      this._role = role;
      return this;
    }

    build() {
      return new UserEntity(
        this._userId,
        this._age,
        this._createdAt,
        this._height,
        this._role,
      );
    }
  };
}
