import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from './dto/create-comment.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postService.createPost(createPostDTO);
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post(':postId/comment')
  async createComments(
    @Param('postId') postId: string,
    userId: string, @Body()
    content: string,
  ): Promise<CreateCommentDTO> {
    return this.postService.createComments(postId, userId, content);
  }
}
