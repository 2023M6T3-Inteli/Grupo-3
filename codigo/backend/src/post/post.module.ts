import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import { SeedConsumer } from '../consumers/seed.consumer';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    KafkaModule,
    ClientsModule.register([
      {
        name: 'POST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'post',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'post-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, SeedConsumer],
})
export class PostModule {}
