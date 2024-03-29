import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Agent } from 'https';
import { SeedConsumer } from '../consumers/seed.consumer';
import { KafkaModule } from '../kafka/kafka.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}),
    KafkaModule,
    HttpModule.register({
      httpAgent: new Agent({
        rejectUnauthorized: false,
      }),
    }),
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, SeedConsumer, {
    provide: 'AUTH_PRODUCER',
    useFactory: async (kafkaService: ClientKafka) => {
      return kafkaService.connect();
    },
    inject: ['AUTH_MICROSERVICE'],
  },],
})
export class AuthModule {}
