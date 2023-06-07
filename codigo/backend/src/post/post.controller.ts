/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Body() createPostDTO: CreatePostDTO,
    @GetCurrentUserId() userID: string,
    @UploadedFile() imagem: Express.Multer.File,
  ) {
    return this.postService.createPost(createPostDTO, userID, imagem);
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('byId/:postID')
  async getPostById(
    @Param('postID') postID: string,
  ) {
    return this.postService.getPostById(postID);
  }

  //criar rota para dar like em posts
  @Post('likes/:postID')
  async incrementLike(
    @Param('postID') postID: string,
    @GetCurrentUserId() userID: string,
  ): Promise<{}> {
    return this.postService.incrementLike(postID, userID);
  }

  @Get('comments')
  async findAllComments() {
    return this.postService.findAllComments();
  }

  @Get('comments/:postId')
  async findCommentsByPostId(
    @Param('postId') postId: string,
  ) {
    return this.postService.findCommentsByPostId(postId);
  }

  @Post('comment/:postId')
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

  //Delete post function, available only to the post owner and application admin

  @Delete('delete/:postId')
  async deletePost(
    @Param('postId') postId: string,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.postService.deletePost(postId, userId);
  }

  // Edit post function, available only to the post owner
  @Put('edit/:postId')
  async editPost(
    @Param('postId') postId: string,
    @Body() newData: string,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.postService.editPost(userId, postId, newData);
  }
}
