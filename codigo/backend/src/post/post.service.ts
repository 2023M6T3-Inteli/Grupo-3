import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
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
      include: {
        _count: true,
        userPost: { select: { userID: true } },
        tags: { select: { subject: true } },
      },
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

  // get all comments
  async findAllComments() {
    return this.prisma.comments.findMany();
  }

  async findCommentsByPostId(postId: string) {
    const post = await this.prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comments = await this.prisma.comments.findMany({
      where: { postID: postId },
    });

    return comments;
  }

  async findCommentsUsersByPostId(postId: string) {
    const post = await this.prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comments = await this.prisma.comments.findMany({
      where: { postID: postId },
    });

    const usersID = [];

    for (let i = 0; i < comments.length; i++) {
      usersID.push(comments[i].userID);
    }

    const users = [];

    for (let i = 0; i < usersID.length; i++) {
      const userstst = await this.prisma.user.findMany({
        where: { id: usersID[i] },
      });
      users.push(userstst[0]);
    }

    return users;
  }

  // Create comments in posts
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

  //Delete post function, available only to the post owner and application admin
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

  // Edit post function, available only to the post owner
  async editPost(userId: string, postId: string, newData: any): Promise<any> {
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
