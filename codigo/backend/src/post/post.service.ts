/* eslint-disable prettier/prettier */
import {
  BadGatewayException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { ProducerService } from '../kafka/producer.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly producerService: ProducerService,
    @Inject('POST_MICROSERVICE') private readonly postClient: ClientKafka,
  ) {}

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

    await this.producerService.produce({
      topic: 'new-post',
      messages: [{ value: 'New Post' }],
    });

    this.postClient.send('new-post', JSON.stringify(createPostDTO));

    return createdPost;
  }

  async getAllPosts() {
    const posts = await this.prisma.post.findMany({
      where: { active: true },
      include: {
        userPost: {
          select: {
            user: { select: { name: true, username: true, image: true } },
          },
        },
        _count: { select: { likes: true } },
      },
      orderBy: { createdAt: 'desc' },
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

  async findAllComments() {
    return this.prisma.comments.findMany();
  }

  async createComments(postId: string, userId: string, content: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const commentAdd = await this.prisma.comments.create({
      data: {
        content: content['content'],
        userID: userId,
        postID: postId,
      },
    });

    return commentAdd;
  }

  async deletePost(postId: string, userId: string): Promise<Post> {
    const post = await this.prisma.userPost.findFirst({
      where: {
        postID: { equals: postId },
      },
    });

    const userAdmin = await this.prisma.user.findFirst({
      where: {
        id: { equals: userId },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userID !== userId && userAdmin.admin == false) {
      throw new UnauthorizedException(
        'You are not allowed to delete this post',
      );
    }

    const deletedPost = await this.prisma.post.delete({
      where: { id: postId },
    });

    return deletedPost;
  }

  async editPost(userId: string, postId: string, newData: any): Promise<void> {
    const post = await this.prisma.userPost.findFirst({
      where: {
        postID: { equals: postId },
      },
    });

    if (!post || post.userID !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }

    await this.prisma.post.update({ where: { id: postId }, data: newData });
  }
}
