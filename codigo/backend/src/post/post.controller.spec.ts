import { Test, TestingModule } from '@nestjs/testing';
import { Comments } from '@prisma/client';
import { AdminGuard } from '../guards/admin.guard';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
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
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        { provide: PrismaService, useValue: prismaMock },
        AdminGuard
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('comments', () => {
    it('should return all comments', async () => {
      const comments: Comments[] = [
        { id: 'commentId', content: 'Test Comment', userID: 'userId', postID: 'postId' },
      ];

      jest.spyOn(service, 'findAllComments').mockResolvedValue(comments);

      const result = await controller.findAllComments();

      expect(service.findAllComments).toHaveBeenCalledTimes(1);
      expect(result).toEqual(comments);
    });
  });
});
