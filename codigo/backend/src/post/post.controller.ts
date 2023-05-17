import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';

@ApiTags('post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  
  @Post()
  async createPost(@Body() createPostDTO: CreatePostDTO, @GetCurrentUserId() userID: string) {
    return this.postService.createPost(createPostDTO, userID);
  }

  @Get()
  async getAllPosts(){
    return this.postService.getAllPosts();
  }


  //esse pode estar errado, então pode ser refatorado.
  @Post(':postId/comment')
  async createComments(
    @Param('postId') postId: string,
    userId: string, @Body()
    content: string,
  ): Promise<CreateCommentDTO> {
    return this.postService.createComments(postId, userId, content);
  }

  //criar rota de delete post, mas apenas o dono do post e o administrador do site podem deleta-lo
  //criar rota de update no post, apenas o dono do post pode editá-lo.
  //criar rota para dar like em posts
}
