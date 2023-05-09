import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDTO } from './dto/create-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserDTO: CreateUserDTO) {
    const { username } = createUserDTO;

    const checkUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (checkUser) {
      throw new BadGatewayException('User already exists');
    }

    await this.prisma.user.create({
      data: {
        name: createUserDTO.name,
        email: createUserDTO.email || 'email@delltechnologies.com',
        hashedPassword: createUserDTO.hashedPassword,
        username: createUserDTO.username,
        image: createUserDTO.image || '',
        location: createUserDTO.location || '',
        acceptTerms: createUserDTO.acceptTerms,
        admin: createUserDTO.admin || false,
        role: createUserDTO.role || '',
        curriculum: createUserDTO.curriculum || '',
        score: createUserDTO.score || 0,
      },
    });

    return { message: 'User created' };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new Error('User doesnt exist');
    }

    if (user.id === id) {
      throw new Error("You can't delete youself!");
    }

    if (user.admin === false) {
      throw new Error(
        "You don't have permission to delete other users. Permission denied!",
      );
    }

    const deletedUser = await this.prisma.user.delete({ where: { id: id } });

    return deletedUser;
  }
}
