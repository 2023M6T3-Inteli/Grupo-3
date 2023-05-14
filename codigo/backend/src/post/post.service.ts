import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDTO: CreatePostDTO) {
    const createdPost = await this.prisma.post.create({
      data: {
        title: createPostDTO.title,
        description: createPostDTO.description,
        image: createPostDTO.image,
        content: createPostDTO.content,
        active: createPostDTO.active,
      },
    });

    return createdPost;
  }

  async getAllPosts() {
    const posts = await this.prisma.post.findMany({
      where: { active: true },
    });
    return posts;
  }

  async createComments(
    postId: string,
    userId: string,
    content: string,
  ): Promise<CreateCommentDTO> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new Error('Post not found');
    }

    const active = await this.prisma.post.findMany({
      where: { id: postId, active: true },
    });

    if (!active) {
      throw new Error('Post was deleted or oculted by the author');
    }

    const commentAdd = await this.prisma.comments.create({
      data: {
        content,
        userID: user.id,
        postID: post.id,
      },
    });
    return commentAdd;
  }
}
