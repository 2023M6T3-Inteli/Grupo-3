import { Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
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
      },
      orderBy: {
        score: 'desc',
      },
      take: 30,
    });
    return rankedUsers;
  }

  //Adição de score com base no id, relacionando ao número de posts
  async addScore(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const postCounter = await this.prisma.post.count({ where: { userID: id } });

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: { score: user.score + postCounter },
    });
    return updatedUser;
  }
}
