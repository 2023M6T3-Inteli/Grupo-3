import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRankingDto } from './dto/create-ranking.dto';

//Ranking service como injetável
@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  //Função para listar todos os 10 usuários mais ativos na plataforma
  async findAll(): Promise<CreateRankingDto[]> {
    try {
      const rankedUsers = await this.prisma.user.findMany({
        select: {
          id: false,
          username: true,
          score: true,
          image: true,
        },
        orderBy: {
          score: 'desc',
        },
        take: 10,
      });

      return rankedUsers;
    } catch (error) {
      {
        message: error;
      }
    }
  }
}
