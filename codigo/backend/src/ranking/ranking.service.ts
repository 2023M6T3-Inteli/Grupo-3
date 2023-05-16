import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { PrismaService } from '../prisma/prisma.service';


//Ranking service como injetável
@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  //Função para listar todos os 10 usuários mais ativos na plataforma
  async findAll(): Promise<CreateRankingDto[]> {
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
}
