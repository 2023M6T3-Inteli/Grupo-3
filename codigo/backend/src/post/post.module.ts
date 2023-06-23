<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import { SeedConsumer } from '../consumers/seed.consumer';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    KafkaModule,
    CacheModule.register(),
    ClientsModule.register([
      {
        name: 'POST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'post',
            brokers: ['localhost:9092'],
          },
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
=======
import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { SeedConsumer } from '../consumers/seed.consumer';
import { KafkaModule } from '../kafka/kafka.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Module({
  imports: [
    KafkaModule,
    ClientsModule.register([
      {
        name: 'POST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId:'post',
            brokers: ['localhost:9092'],
          }
          // consumer: {
          //   groupId: 'post-producer',
          // },
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    SeedConsumer,
    CaslAbilityFactory,
    {
      provide: 'POST_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['POST_MICROSERVICE'],
    },
  ],
})
export class PostModule {}
>>>>>>> main
