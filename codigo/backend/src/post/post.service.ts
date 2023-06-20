/* eslint-disable prettier/prettier */
import {
  BadGatewayException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
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
        userPost: {
          create: {
            userID: userID,
          },
        },
      },
    });

    for (let i = 0; i < createPostDTO.tags.length; i++) {
      await this.prisma.tags.create({
        data: {
          subject: createPostDTO.tags[i],
          postID: createdPost.id,
        },
      });
    }

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

  async getAllPosts(): Promise<{}> {
    const posts = await this.prisma.post.findMany({
      where: { active: true },
      include: {
        userPost: {
          select: {
            user: { select: { id: true, name: true, username: true, image: true, admin:true } },
          },
        },
        tags: { select: { subject: true } },
        likes: {
          select: {
            post: { select: { id: true } },
            user: { select: { id: true } },
          },
        },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts;
  }

  async getPostById(postID: string): Promise<{}> {
    const posts = await this.prisma.post.findUnique({
      where: { id: postID },
      include: {
        userPost: {
          select: {
            user: { select: { name: true, username: true, image: true } },
          },
        },
        tags: { select: { subject: true } },
        likes: {
          select: {
            post: { select: { id: true } },
            user: { select: { id: true } },
          },
        },
        _count: { select: { likes: true, comments: true } },
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

  async findCommentsByPostId(postId: string) {
    const post = await this.prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comments = await this.prisma.comments.findMany({
      where: { postID: postId },
      include: {
        user: {
          select: { name: true, username: true, image: true, admin: true },
        },
        post: {
          select: {
            id: true,
            title: true,
            description: true,
            image: true,
            active: true,
            content: true,
            createdAt: true,
            _count: { select: { likes: true, comments: true } },
          },
        },
      },
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
      const auxUser = await this.prisma.user.findMany({
        where: { id: usersID[i] },
      });
      users.push(auxUser[0]);
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

  async findAllReportPosts() {
    return this.prisma.reportPosts.findMany();
  }

  async reportPost(postId: string, userID: string){
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId
      }
    })

    if (!post){
      throw new NotFoundException(
        'Post not found',
      )
    }

    const reportPost = await this.prisma.reportPosts.create({
      data: {
        userID: userID,
        postID: postId,
      }
    })

    return reportPost
  }

  async findAllReportComments() {
    return this.prisma.reportPosts.findMany();
  }

  async reportComment(commentId: string, userID: string){
    const comment = await this.prisma.post.findFirst({
      where: {
        id: commentId
      }
    })

    if (!comment){
      throw new NotFoundException(
        'Comment not found',
      )
    }

    const ReportComments = await this.prisma.reportComments.create({
      data: {
        userID: userID,
        commentsId: commentId,
      }
    })

    return ReportComments
  }
}
