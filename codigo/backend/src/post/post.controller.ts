/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Delete, UseGuards, Req, Put, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators';
import { IsString, IsNotEmpty } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body() createPostDTO: CreatePostDTO,
    @GetCurrentUserId() userID: string,
  ) {
    return this.postService.createPost(createPostDTO, userID);
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('comments')
  async findAllComments() {
    return this.postService.findAllComments();
  }

  @Post('comment/:postId')
  async createComment(
    @Param('postId') postId: string,
    @GetCurrentUserId() userId: string,
    @Body() content: string
  ): Promise<CreateCommentDTO>{
    try {
      return this.postService.createComments(postId, userId, content);
    } catch (error) {
      throw new HttpException('Error creating comment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //criar rota para dar like em posts
  @Post('likes/:postID')
  async incrementLike(@Param('postID') postID: string, @GetCurrentUserId() userID: string): Promise<{}> {
    return this.postService.incrementLike(postID, userID);
  }

  //criar rota de delete post, mas apenas o dono do post e o administrador do site podem deleta-loç

  @Delete(':id')
  // @UseGuards(AdminGuard)
  async deletePost(
    @Param('postId') postId: string,
    @Req() request: Request,
    @GetCurrentUserId() userId: string,
    ): Promise<void> {
      try {
        await this.postService.deletePost(postId, userId);
      } catch (error) {
        throw new HttpException('Error delete post', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  
  //criar rota de update no post, apenas o dono do post pode editá-lo.
  @Put('edit/:id')
  async editPost(
    @Param('postId') postId: string,
    @Body() newData: any,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    try {
      await this.postService.editPost(userId, postId, newData);
    } catch (error) {
      throw new HttpException('Error delete post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
