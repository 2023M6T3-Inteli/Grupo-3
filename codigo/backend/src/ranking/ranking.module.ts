import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports: [PrismaModule],
  controllers: [RankingController],
  providers: [RankingService, PrismaService],
})
export class RankingModule {}
