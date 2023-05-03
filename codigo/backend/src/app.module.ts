import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { RankingModule } from './ranking/ranking.module';
@Module({
  imports: [PrismaModule, RankingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
