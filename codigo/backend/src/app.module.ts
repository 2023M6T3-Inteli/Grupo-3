import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { HomeModule } from './home/home.module';
import { InterestModule } from './interest/interest.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RankingModule } from './ranking/ranking.module';
import { UserModule } from './user/user.module';
import { RootModule } from './root/root.module';
@Module({
  imports: [PrismaModule, RankingModule, UserModule, HomeModule, NotificationsModule, InterestModule, RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
