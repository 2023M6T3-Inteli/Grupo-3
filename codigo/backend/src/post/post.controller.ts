/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
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

  //contabiliza os likes do post 
  /*async postLiked(id:string){
    const findPost = await 
    this.prisma.post.findUnique({where:{id}});

    if (!findPost){
      throw new Error('Like not found')
    }

    const isActive = await
    this.prisma.post.findUnique({
      where:{id},
      select:{active:true},
    })

    if (!isActive){
      throw new Error('Post not active');
    }

    //aqui vc vai colocar a lógica para incrementar o like a um post
    

    return {message:'Post liked with sucess!'}

  }*/
  
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
