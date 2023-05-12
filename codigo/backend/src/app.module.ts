import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PostModule } from './post/post.module';
import { RankingModule } from './ranking/ranking.module';
import { RootModule } from './root/root.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    RankingModule,
    UserModule,
    NotificationsModule,
    RootModule,
    PostModule,
    AuthModule,
  ],
  //providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
