import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { NewPostConsumer } from '../consumers/new-post.consumer';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [PostController],
  providers: [PostService, NewPostConsumer],
})
export class PostModule {}
