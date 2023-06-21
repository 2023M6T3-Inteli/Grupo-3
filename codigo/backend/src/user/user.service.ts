/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileUser } from './dto/pick-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        acceptTerms: false,
        admin: false,
        comments: true,
        email: true,
        createdAt: true,
        name: true,
        username: true,
        curriculum: true,
        hashedPassword: false,
        image: true,
        id: false,
        likes: { select: { postID: true } },
        location: true,
        role: true,
        score: true,
        updatedAt: false,
        userPost: { select: { post: true } },
        tags: true,
      },
    });

    return users;
  }

  async findOne(userId: string): Promise<ProfileUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        acceptTerms: false,
        admin: false,
        comments: true,
        email: true,
        createdAt: true,
        name: true,
        username: true,
        curriculum: true,
        hashedPassword: false,
        image: true,
        id: false,
        likes: true,
        location: true,
        role: true,
        score: true,
        updatedAt: false,
        userPost: { select: { post: true } },
        tags: true,
      },
    });

    if (!user) {
      throw new BadGatewayException();
    }
    return user;
  }

  async findByEmail(email: string): Promise<ProfileUser> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        acceptTerms: false,
        admin: false,
        comments: true,
        email: true,
        createdAt: true,
        name: true,
        username: true,
        curriculum: true,
        hashedPassword: false,
        image: true,
        id: false,
        likes: true,
        location: true,
        role: true,
        score: true,
        updatedAt: false,
        userPost: { select: { post: true } },
        tags: true,
      },
    });
    if (!user) {
      throw new BadGatewayException();
    }
    return user;
  }

  async findByUsername(username: string): Promise<ProfileUser> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        acceptTerms: false,
        admin: false,
        comments: true,
        email: true,
        createdAt: true,
        name: true,
        username: true,
        curriculum: true,
        hashedPassword: false,
        image: true,
        id: false,
        likes: true,
        location: true,
        role: true,
        score: true,
        updatedAt: false,
        userPost: { select: { post: true } },
        tags: true,
      },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    return user;
  }

  async getAdminUsers(currentUser: string): Promise<ProfileUser[]> {
    const adminUsers = this.prisma.user.findMany({
      where: { admin: true },
      select: {
        acceptTerms: false,
        admin: false,
        comments: true,
        email: true,
        createdAt: true,
        name: true,
        username: true,
        curriculum: true,
        hashedPassword: false,
        image: true,
        id: false,
        likes: true,
        location: true,
        role: true,
        score: true,
        updatedAt: false,
        userPost: { select: { post: true } },
        tags: true,
      },
    });
    return adminUsers;
  }

  async deleteUser(id: string, currentUser: string): Promise<User> {
    const findUser = await this.prisma.user.findUnique({ where: { id } });

    if (!findUser) {
      throw new Error('User does not exist');
    }

    if (findUser.id == currentUser) {
      throw new Error('You can not delete yourself. Permission denied!');
    }

    const isAdmin = await this.prisma.user.findUnique({
      where: { id: currentUser },
    });

    if (!isAdmin) {
      throw new Error('Only admin users can delete others. Permission denied!');
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser;
  }

  async getAllTags() {
    const tags = await this.prisma.tags.findMany({
      select: {
        id: true,
        userID: true,
        postID: true,
        subject: true,
      },
    });
    return tags;
  }

  async deleteTag(userId: string, delTag: string): Promise<void> {
    const findTag = await this.prisma.tags.findFirst({
      where: {
        userID: userId,
        subject: delTag['tag'],
      },
    });

    if (!findTag) {
      throw new BadGatewayException('Tag relationship does not exist!');
    }

    await this.prisma.tags.delete({
      where: {
        id: findTag.id,
      },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.tags.deleteMany({
      where: {
        userID: userId,
      },
    });
  }

  async deleteByPostId(postId: string): Promise<void> {
    await this.prisma.tags.deleteMany({
      where: {
        postID: postId,
      },
    });
  }

  async updateUserTags(userId: string, tags: string[]): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new BadGatewayException('Invalid user!');
    }

    if (user.firstLogin == false) {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstLogin: true,
        },
      });

      for (let i = 0; i < tags.length; i++) {
        await this.prisma.tags.create({
          data: {
            userID: user.id,
            subject: tags[i],
            postID: '',
          },
        });
      }
    } else {
      throw new BadGatewayException(
        'User has already performed the setup of his account!',
      );
    }
  }
}
