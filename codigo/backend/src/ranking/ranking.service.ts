import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

//Ranking service como injetável
@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  //Função para listar todos os 30 usuários mais ativos na plataforma
  async findAll() {
    const rankedUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        score: true,
        image: true,
      },
      orderBy: {
        score: 'desc',
      },
      take: 10,
    });
    return rankedUsers;
  }

  //Adição de score com base no id, relacionando ao número de posts
  async addScore(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      // include: { userPost: true },
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const numPosts = await this.prisma.userPost.count({
      where: { userID: userId },
    });

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { score: user.score + numPosts },
    });
    return updatedUser;
  }
}
