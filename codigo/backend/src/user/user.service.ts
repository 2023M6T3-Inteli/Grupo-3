/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async getAdminUsers(): Promise<ProfileUser[]> {
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

  async deleteUser(id: string): Promise<User> {
    const findUser = await this.prisma.user.findUnique({ where: { id } });

    if (!findUser) {
      throw new Error('User does not exist');
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return;
  }

  async updateUserTags(userId: string, tags: string[]): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if(!user){
      throw new Error('Invalid user');
    }

    if(user.firstLogin == true){
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstLogin: true,
        },
      })

      for(let i = 0; i < tags.length; i++){
        await this.prisma.tags.create({
          data: {
            userID: user.id,
            subject: tags[i],
          },
        });
      }
    }
  }
}
