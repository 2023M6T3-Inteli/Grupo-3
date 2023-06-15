import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Comments } from '@prisma/client';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { AdminGuard } from '../guards/admin.guard';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

const fakeComments = [
  {
    content: 'Comment 1',
  },
  {
    content: 'Comment 2',
  },
  {
    content: 'Comment 3',
  },
];

const fakePosts = [
  {
    id: 'adufs',
    title: 'Teste Title',
    active: true,
    image: '',
    content: 'Teste',
    description: 'This is a test',
    userPost: {
      userId: 'abwc',
      admin: true,
    },
    comments: [],
    createdAt: new Date(),
  },
  {
    id: 'suahfusdf',
    title: 'Teste Title 2',
    active: true,
    image: '',
    content: 'Teste',
    description: 'This is a test',
    userPost: {
      userId: 'abca',
      admin: true,
    },
    comments: [],
    createdAt: new Date(),
  },
  {
    id: 'any',
    title: 'Teste Title 3',
    active: true,
    image: '',
    content: 'Teste',
    userPost: {
      userId: 'abce',
      admin: false,
    },
    description: 'This is a test',
    comments: [],
    createdAt: new Date(),
  },
  {
    id: 'auhdfus',
    title: 'Teste Title 4',
    active: true,
    image: '',
    content: 'Teste',
    userPost: {
      userId: 'abcd',
      admin: false,
    },
    description: 'This is a test',
    comments: [],
    createdAt: new Date(),
  },
];

const fakeUsers: User[] = [
  {
    acceptTerms: true,
    email: 'new@dell.com',
    name: 'new',
    username: 'newer',
    admin: true,
    hashedPassword: 'abcd1234',
    score: 0,
  },
  {
    acceptTerms: true,
    email: 'newa@dell.com',
    name: 'new',
    username: 'newera',
    admin: true,
    hashedPassword: 'abcd1234',
    score: 0,
  },
  {
    acceptTerms: true,
    email: 'newb@dell.com',
    name: 'new',
    username: 'newerb',
    admin: true,
    hashedPassword: 'abcd1234',
    score: 0,
  },
];

const prismaMock = {
  post: {
    create: jest.fn().mockReturnValue(fakePosts[0]),
    findMany: jest.fn().mockResolvedValue(fakePosts),
    findUnique: jest.fn().mockResolvedValue(fakePosts[0]),
    findFirst: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(fakePosts[0]),
    delete: jest.fn().mockImplementation((params) => {
      const postId = params.where.id;
      const deletedPost = fakePosts.find((post) => post.id === postId);
      if (deletedPost) {
        return deletedPost;
      }
      return null;
    }),
  },
  user: {
    findUnique: jest.fn().mockResolvedValue({
      id: 'abwc',
      admin: true,
    }),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
  },
  userPost: {
    findUnique: jest.fn().mockResolvedValue(fakePosts[0]),
  },
  likes: {
    findFirst: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
  comments: {
    create: jest.fn().mockReturnValue(fakeComments[0]),
    findMany: jest.fn().mockResolvedValue(fakeComments),
  },
};

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          { name: 'POST_PRODUCER', transport: Transport.KAFKA },
        ]),
      ],
      controllers: [PostController],
      providers: [
        PostService,
        { provide: PrismaService, useValue: prismaMock },
        AdminGuard,
        CaslAbilityFactory,
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
    expect(postService).toBeDefined();
  });

  describe('comments', () => {
    it('should return all comments', async () => {
      const comments: Comments[] = [
        {
          id: 'commentId',
          content: 'Test Comment',
          userID: 'userId',
          postID: 'postId',
        },
      ];

      jest.spyOn(postService, 'findAllComments').mockResolvedValue(comments);

      const result = await postController.findAllComments();

      expect(postService.findAllComments).toHaveBeenCalledTimes(1);
      expect(result).toEqual(comments);
    });

    it('should create a comment', async () => {
      const postId = 'postId';
      const userId = 'userId';
      const content = 'comment content';
      const createdComment: Comments = {
        id: 'commentID',
        userID: userId,
        postID: postId,
        content: content,
      };

      jest
        .spyOn(postService, 'createComments')
        .mockResolvedValueOnce(createdComment);

      const result = await postController.createComment(
        postId,
        userId,
        content,
      );

      expect(postService.createComments).toBeCalledWith(
        postId,
        userId,
        content,
      );
      expect(result).toEqual(createdComment);
    });
  });

  describe('post', () => {
    it('should create a post', async () => {
      const createPostDTO: Post = {
        title: 'Test Post',
        content: 'Test Content',
        description: 'Test Description',
        image: 'image.png',
        active: true,
        comments: {
          content: '',
          id: '',
          postID: '',
          userID: '',
        },
      };
      const userID = 'userId';

      const createdPost: CreatePostDTO = {
        title: createPostDTO.title,
        description: createPostDTO.description,
        image: createPostDTO.image,
        content: createPostDTO.content,
      };

      jest.spyOn(postService, 'createPost').mockResolvedValueOnce(createdPost);

      const result = await postController.createPost(createPostDTO, userID);

      expect(postService.createPost).toBeCalledWith(createPostDTO, userID);
      expect(result).toEqual(createdPost);
    });
    it('should get all posts', async () => {
      const posts = await postController.getAllPosts();

      expect(posts).toEqual(fakePosts);
    });
  });

  describe('incrementLike', () => {
    it('should increment the like count of a post', async () => {
      const postID = 'postID';
      const userID = 'userID';

      jest.spyOn(postService, 'incrementLike').mockResolvedValueOnce(true);

      const result = await postController.incrementLike(postID, userID);

      expect(postService.incrementLike).toBeCalledWith(postID, userID);
      expect(result).toBe(true);
    });
  });
  describe('editPost', () => {
    it('should edit a post', async () => {
      const postId = 'postId';
      const newData = {
        title: 'Updated Test Post',
        content: 'Content',
        createdAt: new Date(),
        active: true,
        description: 'desc',
        image: '.png',
        id: 'post edited Id',
      };
      const userId = 'userId';

      jest.spyOn(postService, 'editPost').mockResolvedValueOnce({
        title: 'Updated Test Post',
        content: 'Content',
        createdAt: new Date(),
        active: true,
        description: 'desc',
        image: '.png',
        id: 'post edited Id',
      });

      const result = await postController.editPost(postId, newData, userId);

      expect(postService.editPost).toBeCalledWith(userId, postId, newData);
      expect(result).toEqual(newData);
    });
  });

  describe('delete Post', () => {
    it('should not delete post if is not the owner', async () => {
      const userID = 'userID';
      const postID = fakePosts[0].id;
      const deletedPost = fakePosts[0];

      jest.spyOn(postService, 'deletePost').mockResolvedValueOnce({
        id: deletedPost.id,
        active: deletedPost.active,
        content: deletedPost.content,
        createdAt: new Date(),
        description: deletedPost.description,
        title: deletedPost.title,
        image: deletedPost.image,
      });

      const result = await postController.deletePost(postID, userID);
      expect(postService.deletePost).toBeCalledWith(postID, userID);
      expect(result).not.toBe(deletedPost);
    });

    it('should delete a post', async () => {
      const deletedPost = fakePosts[1];
      const postID = deletedPost.id;
      const userID = deletedPost.userPost.userId;
      const data = {
        title: deletedPost.title,
        content: deletedPost.content,
        description: deletedPost.description,
        image: deletedPost.image,
        active: deletedPost.active,
        createdAt: new Date(),
        userPost: { admin: deletedPost.userPost.admin, userId: userID },
        comments: [],
      };

      jest.spyOn(postService, 'deletePost').mockResolvedValueOnce({
        id: deletedPost.id,
        title: deletedPost.title,
        content: deletedPost.content,
        description: deletedPost.description,
        image: deletedPost.image,
        active: deletedPost.active,
        createdAt: new Date(),
      });

      const result = await postController.deletePost(postID, userID);

      expect(postService.deletePost).toBeCalledWith(postID, userID);
      expect(postService.deletePost).toBeCalledTimes(1);
    });
  });
});
