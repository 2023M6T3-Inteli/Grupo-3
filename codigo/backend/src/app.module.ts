import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { AtGuard } from './common/guards';
import { KafkaModule } from './kafka/kafka.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { RankingModule } from './ranking/ranking.module';
import { RootModule } from './root/root.module';
import { UserModule } from './user/user.module';
import { SeedConsumer } from './consumers/seed.consumer';

@Module({
  imports: [
    PrismaModule,
    RankingModule,
    UserModule,
    NotificationsModule,
    RootModule,
    PostModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CaslModule,
    KafkaModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }, SeedConsumer],
})
export class AppModule {}
