/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  async createPost(
    @Body() createPostDTO: CreatePostDTO,
    @GetCurrentUserId() userID: string,
  ) {
    return this.postService.createPost(createPostDTO, userID);
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
}
