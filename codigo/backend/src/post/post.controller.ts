/* eslint-disable prettier/prettier */
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';
import {
  Producer,
  KafkaMessage,
} from '@nestjs/microservices/external/kafka.interface';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject('POST_PRODUCER') private kafkaProducer: Producer,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  async createPost(
    @Body() createPostDTO: CreatePostDTO,
    @GetCurrentUserId() userID: string,
  ) {
    const post = this.postService.createPost(createPostDTO, userID);
    this.kafkaProducer.send({
      topic: 'post',
      messages: [{ key: 'post', value: JSON.stringify(createPostDTO) }],
    });
    return post;
  }

  @Get()
  @ApiBearerAuth()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('comments')
  @ApiBearerAuth()
  async findAllComments() {
    return this.postService.findAllComments();
  }

  @Post('comment/:postId')
  @ApiBearerAuth()
  async createComment(
    @Param('postId') postId: string,
    @GetCurrentUserId() userId: string,
    @Body() content: string,
  ): Promise<CreateCommentDTO> {
    try {
      return this.postService.createComments(postId, userId, content);
    } catch (error) {
      throw new HttpException(
        'Error creating comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //criar rota para dar like em posts
  @Post('likes/:postID')
  @ApiBearerAuth()
  async incrementLike(
    @Param('postID') postID: string,
    @GetCurrentUserId() userID: string,
  ): Promise<{}> {
    return this.postService.incrementLike(postID, userID);
  }

  //Delete post function, available only to the post owner and application admin

  @Delete('delete/:postId')
  @ApiBearerAuth()
  async deletePost(
    @Param('postId') postId: string,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.postService.deletePost(postId, userId);
  }

  // Edit post function, available only to the post owner
  @Put('edit/:postId')
  @ApiBearerAuth()
  async editPost(
    @Param('postId') postId: string,
    @Body() newData: string,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.postService.editPost(userId, postId, newData);
  }

  // @MessagePattern('post')
  // async consumer(@Payload() message: KafkaMessage) {
  //   await this.kafkaProducer.send({
  //     topic: 'post',
  //     messages: [
  //       { key: 'post', value: JSON.stringify({ ...message.value }) },
  //     ],
  //   });
  // }
}
