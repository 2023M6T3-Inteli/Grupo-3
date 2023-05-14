import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { email, username } = createUserDTO;

    //verifica se o email já existe
    const checkEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (checkEmail) {
      throw new BadGatewayException('Email already exists');
    }

    //verifica se o username já existe
    const checkUsername = await this.prisma.user.findUnique({
      where: { username },
    });

    if (checkUsername) {
      throw new BadGatewayException('Username already exists');
    }

    //Verifica se o usuário aceitou os termos e condições.
    // const acceptedTerm = await this.prisma.user.findFirst({
    //   where: { acceptTerms: true },
    // });

    // if (!acceptedTerm.acceptTerms) {
    //   throw new BadGatewayException('User must accept the terms');
    // }

    //Cria o usuário
    const user = await this.prisma.user.create({
      data: {
        email: createUserDTO.email,
        name: createUserDTO.name || '',
        acceptTerms: createUserDTO.acceptTerms || true,
        admin: createUserDTO.admin || false,
        username: createUserDTO.username,
        role: createUserDTO.role || '',
        score: createUserDTO.score || 0,
        image: createUserDTO.image || '',
        curriculum: createUserDTO.curriculum || '',
        hashedPassword: await bcrypt.hash(createUserDTO.hashedPassword, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    //retorna o usuário, exceto sua senha
    return {
      ...user,
      hashedPassword: undefined,
    };
  }

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
