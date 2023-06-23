<<<<<<< HEAD
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { CreatePostDTO, UpdatePostDTO } from './dto/create-post.dto';

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
        active: true,
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

  async getAllPosts(): Promise<{}> {
    const posts = await this.prisma.post.findMany({
      where: { active: true },
      include: {
        userPost: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
                admin: true,
              },
            },
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

  async incrementLike(postID: string, userID: string): Promise<boolean> {
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
      return false; // O usuário já deu "like" no post anteriormente
    }

    await this.prisma.likes.create({
      data: {
        count: 1,
        postID,
        userID,
      },
    });

    await this.prisma.likes.count({ where: { postID } });

    return true;
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

  async editPost(
    userId: string,
    postId: string,
    newData: UpdatePostDTO,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { userPost: { select: { userID: true } } },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const uID = post.userPost.find((x) => x.userID);

    if (uID.userID !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }

    const editedPost = await this.prisma.post.update({
      where: { id: postId },
      data: newData,
    });

    return editedPost;
  }

  async deletePost(postId: string, userId: string): Promise<Post> {
    const post = await this.prisma.userPost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userAdmin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

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

  async deleteAll(userID: string): Promise<string> {
    const adminUser = await this.prisma.user.findUnique({
      where: { id: userID },
      select: { admin: true },
    });

    if (!adminUser)
      throw new UnauthorizedException(
        'You are not allowed to delete all posts',
      );

    await this.prisma.post.deleteMany();

    return 'All posts deleted';
  }

  //pegar todos os posts curtidos 
  async getAllLikeds(userId: string) {
    return await this.prisma.likes.findMany({
      where: {id: userId},
    }
    )
  }
}
=======
/* eslint-disable prettier/prettier */
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDTO, UpdatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(
    createPostDTO: CreatePostDTO,
    userID: string,
  ): Promise<Post> {
    const createdPost = await this.prisma.post.create({
      data: {
        title: createPostDTO.title,
        description: createPostDTO.description,
        image: createPostDTO.image,
        content: createPostDTO.content,
        active: true,
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

  async getAllPosts(): Promise<{}> {
    const posts = await this.prisma.post.findMany({
      where: { active: true },
      include: {
        userPost: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
                admin: true,
              },
            },
          },
        },
        likes: {
          select: {
            post: { select: { id: true } },
            user: { select: { id: true } },
          },
        },
        tags: { select: { subject: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts;
  }

  async incrementLike(postID: string, userID: string): Promise<boolean> {
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
      return false; // O usuário já deu "like" no post anteriormente
    }

    await this.prisma.likes.create({
      data: {
        count: 1,
        postID,
        userID,
      },
    });

    await this.prisma.likes.count({ where: { postID } });

    return true;
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

    const commentsReport = await this.prisma.comments.findMany({
      where: { postID: postId },
    });

    console.log(commentsReport.find((x) => x.report));
    if (!commentsReport.find((x) => x.report)) {
      throw new Error();
    }
    const usersID = [];

    for (let i = 0; i < commentsReport.length; i++) {
      usersID.push(commentsReport[i].userID);
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

  async getPostById(postID: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postID } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async editPost(
    userId: string,
    postId: string,
    newData: UpdatePostDTO,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { userPost: { select: { userID: true } } },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const uID = post.userPost.find((x) => x.userID);

    if (uID.userID !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }

    const editedPost = await this.prisma.post.update({
      where: { id: postId },
      data: newData,
    });

    return editedPost;
  }

  async deletePost(postId: string, userId: string): Promise<Post> {
    const post = await this.prisma.userPost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const userAdmin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

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

  async findAllReportPosts() {
    return this.prisma.reportPosts.findMany();
  }

  async reportPost(postId: string, userID: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const reportPost = await this.prisma.reportPosts.create({
      data: {
        userID: userID,
        postID: postId,
        id: '',
      },
    });

    return reportPost;
  }

  async findAllReportComments() {
    return this.prisma.reportPosts.findMany();
  }

  async reportComment(commentId: string, userID: string) {
    const comment = await this.prisma.post.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const ReportComments = await this.prisma.reportComments.create({
      data: {
        userID: userID,
        commentsId: commentId,
        id: '',
      },
    });

    return ReportComments;
  }

  async verifyAndChangePost(postID: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postID },
    });

    if (!post) throw new Error('Post does not exist');

    const updatePost = await this.prisma.post.update({
      where: { id: postID },
      data: { active: true },
    });

    return updatePost;
  }

  async verifyReportedComemnt(commentID: string) {
    const comment = await this.prisma.comments.findUnique({
      where: { id: commentID },
    });

    if (!comment) throw new Error('Comment does not exist');

    const updateComment = await this.prisma.comments.update({
      where: { id: commentID },
      data: { report: true },
    });

    return updateComment;
  }

  //delete comment
  async deleteCommentById(userID: string, commentID: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userID },
    });

    if (!user) throw new Error('User does not exist');

    const verifyComment = await this.prisma.comments.findUnique({
      where: { id: commentID },
    });

    if (!verifyComment) throw new Error('Comment does not exist');

    const isUserCommentOwner = verifyComment.userID === userID;
    const isUserAdmin = user.admin;

    if (!(isUserCommentOwner || isUserAdmin)) {
      throw new Error('You are not authorized to delete this comment');
    }

    const comment = await this.prisma.comments.delete({
      where: {
        id: commentID,
      },
    });

    return comment;
  }
}
>>>>>>> development
