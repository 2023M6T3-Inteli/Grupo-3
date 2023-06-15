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
import { S3 } from 'aws-sdk';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly producerService: ProducerService,
    @Inject('POST_MICROSERVICE') private readonly postClient: ClientKafka,
  ) {}

  async createPost(
    createPostDTO: CreatePostDTO,
    userID: string,
    imagem: Express.Multer.File,
  ) {
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

    console.log(imagem);
    // const { originalname } = file;
    // console.log(originalname);
    // const bucketS3 = process.env.AWS_BUCKET_NAME;
    // await this.uploadS3(file.buffer, bucketS3, originalname);

    return createdPost;
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async getAllPosts(): Promise<{}> {
    const posts = await this.prisma.post.findMany({
      where: { active: true },
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
          select: { name: true, username: true, image: true },
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

  //pegar todos os posts curtidos 
  async getAllLikeds(userId: string) {
    return await this.prisma.likes.findMany({
      where: {id: userId},
    }
    )
  }
}
