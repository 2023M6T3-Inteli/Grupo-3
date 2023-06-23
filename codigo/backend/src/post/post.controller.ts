/* eslint-disable prettier/prettier */
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
} from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO, UpdatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly ability: CaslAbilityFactory,
    @Inject('POST_PRODUCER') private kafkaProducer: Producer,
  ) {}

  @Post()
  @ApiBearerAuth()
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

  @Get('byId/:postID')
  async getPostById(@Param('postID') postID: string) {
    return this.postService.getPostById(postID);
  }

  //criar rota para dar like em posts
  @Post('likes/:postID')
  @ApiBearerAuth()
  async incrementLike(
    @Param('postID') postID: string,
    @GetCurrentUserId() userID: string,
  ): Promise<boolean> {
    return this.postService.incrementLike(postID, userID);
  }

  @Post('verify/:postID')
  @ApiBearerAuth()
  async verifyAndChangePost(@Param('postID') postID: string) {
    return this.postService.verifyAndChangePost(postID);
  }

  @Post('verify/comment/:commentID')
  @ApiBearerAuth()
  async verifyAndReportComment(@Param('commentID') commentID: string) {
    return this.postService.verifyReportedComemnt(commentID);
  }

  @Get('comments')
  @ApiBearerAuth()
  async findAllComments() {
    return this.postService.findAllComments();
  }

  @Get('comments/:postId')
  async findCommentsByPostId(@Param('postId') postId: string) {
    return this.postService.findCommentsByPostId(postId);
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

  // Edit post function, available only to the post owner
  @Put('edit/:postId')
  @ApiBearerAuth()
  async editPost(
    @Param('postId') postId: string,
    @Body() newData: UpdatePostDTO,
    @GetCurrentUserId() userId: string,
  ) {
    return this.postService.editPost(userId, postId, newData);
  }

  //Delete post function, available only to the post owner and application admin

  @Delete('delete/:postId')
  @ApiBearerAuth()
  async deletePost(
    @Param('postId') postId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.postService.deletePost(postId, userId);
  }

  @Delete('delete/comment/:commentID')
  @ApiBearerAuth()
  async deleteById(
    @Param('commentID') commentID: string,
    @GetCurrentUserId() userID,
  ) {
    return this.postService.deleteCommentById(userID, commentID);
  }
  @Get('report-post')
  @ApiBearerAuth()
  async findAllReportPosts() {
    return this.postService.findAllReportPosts();
  }

  @Post('report/post/:postId')
  @ApiBearerAuth()
  async reportPost(
    @Param('postId') postId: string,
    @GetCurrentUserId() userID: string,
  ) {
    return this.postService.reportPost(postId, userID);
  }

  @Get('report-cooments')
  @ApiBearerAuth()
  async findAllReportComments() {
    return this.postService.findAllReportComments();''
  }

  @Post('report/comment/:commentId')
  @ApiBearerAuth()
  async reportComment(
    @Param('commentId') commentId: string,
    @GetCurrentUserId() userID: string,
  ) {
    return this.postService.reportComment(commentId, userID);
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
