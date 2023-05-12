import { BadGatewayException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDTO } from './dto/create-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { email } = createUserDTO;

    //verifica se o email já existe
    const checkEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (checkEmail) {
      throw new BadGatewayException('Email already exists');
    }

    //verifica se o username já existe
    const checkUsername = await this.prisma.user.findUnique({
      where: { username: createUserDTO.username },
    });

    if (checkUsername) {
      throw new BadGatewayException('Username already exists');
    }

    //Verifica se o usuário aceitou os termos e condições.
    const acceptedTerm = await this.prisma.user.findFirst({
      where: { acceptTerms: true },
    });

    if (!acceptedTerm.acceptTerms) {
      throw new BadGatewayException('User must accept the terms');
    }

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
      }
    });

    //retorna o usuário, exceto sua senha
    return {
      ...user,
      hashedPassword: undefined,
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findByEmail(email: string) {
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
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new Error('User doesnt exist');
    }

    // if (user.admin === false) {
    //   throw new Error(
    //     "You don't have permission to delete other users. Permission denied!",
    //   );
    // }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser;
  }
}
