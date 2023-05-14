import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users;
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        acceptTerms: true,
        admin: true,
        comments: true,
        email: true,
        createdAt: true,
        name: true,
        username: true,
        curriculum: true,
        hashedPassword: true,
        image: true,
        id: true,
        likes: false,
        location: true,
        role: true,
        score: true,
        updatedAt: false,
        userPost: false,
        tags: true,
      },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    return user;
  }

  async getAdminUsers(): Promise<User[]> {
    const adminUsers = this.prisma.user.findMany({ where: { admin: true } });
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
}
