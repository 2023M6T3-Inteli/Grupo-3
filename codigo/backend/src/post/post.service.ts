import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDTO: CreatePostDTO, userID: string) {
    const createdPost = await this.prisma.post.create({
      data: {
        title: createPostDTO.title,
        description: createPostDTO.description,
        image: createPostDTO.image,
        content: createPostDTO.content,
        active: createPostDTO.active,
        userPost: {
          create: {
            userID: userID,
          },
        },
      },
    });

    await this.prisma.user.update({
      where: { id: userID },
      data: { score: { increment: 1 } },
    });

    return createdPost;
  }

  async getAllPosts() {
    const posts = await this.prisma.post.findMany({
      where: { active: true },
      include: { _count: true },
    });
    return posts;
  }

  async incrementLike(postID: string, userID: string): Promise<{}> {
    const findPost = await this.prisma.post.findUnique({
      where: { id: postID },
    });

    if (!findPost) {
      throw new BadGatewayException('Post not found');
    }

    const isActive = await this.prisma.post.findUnique({
      where: { id: postID },
      select: { active: true },
    });

    if (!isActive) {
      throw new BadGatewayException('Post is not active');
    }

    const existingLike = await this.prisma.likes.findFirst({
      where: { userID, postID },
    });

    if (existingLike) {
      await this.prisma.likes.delete({
        where: { id: existingLike.id },
      });

      return { message: 'Like removed successfully' };
    }

    await this.prisma.likes.create({
      data: {
        count: 1,
        postID,
        userID,
      },
    });

    await this.prisma.likes.count({ where: { postID } });

    return { message: 'Post liked with success' };
  }

  //esse daqui ta encaminhado, deixo pro brunao deixar 100% e botar pra aparecer os comentários no post, dica
  //a 2° parte que falei do post você põe no método getAllPosts que está logo acima
  async createComments(postId: string, userId: string, content: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new BadGatewayException('Post not found');
    }

    const active = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { active: true },
    });

    if (!active) {
      throw new BadGatewayException(
        'Post was deleted or oculted by the author',
      );
    }

    const parsedContent = JSON.parse(content);

    const commentAdd = await this.prisma.comments.create({
      data: {
        content: parsedContent.commentAdd,
        userID: userId,
        postID: postId,
      },
    });

    return commentAdd;
  }
}
