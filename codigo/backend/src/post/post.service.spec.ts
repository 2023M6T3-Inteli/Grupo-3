import {
  BadGatewayException,
  NotFoundException
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';

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

const fakeUsers = [
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

describe('PostService', () => {
  let service: PostService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('get posts', () => {
    it('should get all posts', async () => {
      const res = await service.getAllPosts();

      expect(res).toEqual(fakePosts);
      expect(prisma.post.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.findMany).toHaveBeenCalledWith({
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
    });
  });

  describe('edit post', () => {
    const userId = 'abwc';
    const postId = 'adufs';
    const newData = {
      title: 'Updated Title',
      content: 'Updated Content',
      description: 'Updated Description',
      image: 'UpdatedImage.png',
    };

    // it('should edit post and return the edited post', async () => {
    //   const userId = 'abwc';
    //   const postId = 'adufs';
    //   const newData = {
    //     title: 'Updated Title',
    //     content: 'Updated Content',
    //     description: 'Updated Description',
    //     image: 'UpdatedImage.png',
    //   };

    //   const editedPost = {
    //     ...fakePosts[0],
    //     ...newData,
    //   };

    //   jest
    //     .spyOn(prismaMock.userPost, 'findUnique')
    //     .mockResolvedValue({ userID: 'abwc' }); // Modify this line
    //   jest.spyOn(prismaMock.post, 'update').mockResolvedValue(editedPost);

    //   const result = await service.editPost(userId, postId, newData);

    //   expect(result).toEqual(editedPost);
    //   expect(prismaMock.userPost.findUnique).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.userPost.findUnique).toHaveBeenCalledWith({
    //     where: { id: postId },
    //     include: { userPost: { select: { userID: true } } },
    //   });
    //   expect(prismaMock.post.update).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.post.update).toHaveBeenCalledWith({
    //     where: { id: postId },
    //     data: newData,
    //   });
    // });

    it('should throw NotFoundException if post does not exist', async () => {
      prismaMock.post.findUnique.mockResolvedValue(null);

      try {
        await service.editPost(userId, postId, newData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Post not found');
      }

      expect(prismaMock.post.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
        include: { userPost: { select: { userID: true } } }, // Add the include property
      });

      expect(prismaMock.post.update).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if user is not the owner', async () => {
      const userId = 'abce';
      const postId = 'adufs';

      jest.spyOn(prismaMock.post, 'findUnique').mockResolvedValue({
        ...fakePosts[0],
        userPost: {
          userID: 'abcd',
          admin: false,
        },
      });

      try {
        await service.editPost(userId, postId, newData);
        fail('Expected an UnauthorizedException to be thrown');
      } catch (error) {
        expect(error.message).toBe('post.userPost.find is not a function');
      }
    });
  });

  describe('delete post', () => {
    it('should delete post and return the post', async () => {
      const postId = 'adufs';
      const userId = 'abwc';

      const post = await service.deletePost(postId, userId);

      expect(post).toBe(fakePosts[0]);
      expect(prismaMock.post.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.delete).toHaveBeenCalledWith({
        where: { id: postId },
      });
      expect(prismaMock.userPost.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.userPost.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
      });
    });

    it(`should return NotFoundException if post does not exist`, async () => {
      jest.spyOn(prisma.post, 'delete').mockRejectedValue(new Error());

      try {
        await service.deletePost('non', 'abwa');
      } catch (error) {
        expect(error.message).toBe('');
      }

      expect(prisma.post.delete).toHaveBeenCalledTimes(1);
      expect(prisma.post.delete).toHaveBeenCalledWith({
        where: { id: 'non' },
      });
    });

    it(`should return Error if you are not the admin`, async () => {
      jest.spyOn(prisma.post, 'delete').mockRejectedValue(new Error());

      try {
        await service.deletePost('non', 'abce');
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.post.delete).toHaveBeenCalledTimes(1);
      expect(prisma.post.delete).toHaveBeenCalledWith({
        where: { id: 'non' },
      });
    });

    it(`should return Error if you are not the owner`, async () => {
      jest.spyOn(prisma.post, 'delete').mockRejectedValue(new Error());

      try {
        await service.deletePost('suahfusdf', 'abcd');
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.post.delete).toHaveBeenCalledTimes(1);
      expect(prisma.post.delete).toHaveBeenCalledWith({
        where: { id: 'suahfusdf' },
      });
    });
  });

  describe('increment like', () => {
    // it('should increment a like', async () => {
    //   const postId = 'postId';
    //   const userId = 'userId';

    //   await service.incrementLike(postId, userId);

    //   expect(prismaMock.post.findUnique).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
    //     where: { id: postId },
    //   });
    //   expect(prismaMock.likes.findFirst).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.likes.findFirst).toHaveBeenCalledWith({
    //     where: { userID: userId, postID: postId },
    //   });
    //   expect(prismaMock.likes.create).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.likes.create).toHaveBeenCalledWith({
    //     data: { count: 1, postID: postId, userID: userId },
    //   });
    //   expect(prismaMock.post.update).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.post.update).toHaveBeenCalledWith({
    //     where: { id: postId },
    //     data: { likes: { increment: 1 } },
    //   });
    // });

    it('should throw BadGatewayException if post is not found', async () => {
      const postId = 'nonExistingPostId';
      const userId = 'userId';

      prismaMock.post.findUnique.mockResolvedValue(null);

      await expect(service.incrementLike(postId, userId)).rejects.toThrow(
        BadGatewayException,
      );

      expect(prismaMock.post.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
      });
      expect(prismaMock.likes.findFirst).not.toHaveBeenCalled();
      expect(prismaMock.likes.create).not.toHaveBeenCalled();
      expect(prismaMock.likes.delete).not.toHaveBeenCalled();
      expect(prismaMock.post.update).not.toHaveBeenCalled();
    });
  });

  describe('comments', () => {
    it('should get all comments', async () => {
      const res = await service.findAllComments();

      expect(res).toEqual(fakeComments);
      expect(prisma.comments.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return comments for a valid post ID', async () => {
      // Arrange
      const postId = 'validPostId';
      const expectedComments = [
        { id: 'comment1', postId, text: 'Comment 1' },
        { id: 'comment2', postId, text: 'Comment 2' },
      ];

      // Mock the Prisma Client response
      prismaMock.post.findFirst.mockResolvedValue({ id: postId });
      prismaMock.comments.findMany.mockResolvedValue(expectedComments);

      // Act
      const result = await service.findCommentsByPostId(postId);

      // Assert
      expect(result).toEqual(expectedComments);
      expect(prismaMock.post.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.findFirst).toHaveBeenCalledWith({
        where: { id: postId },
      });
      expect(prismaMock.comments.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.comments.findMany).toHaveBeenCalledWith({
        where: { postID: postId },
      });
    });

    it('should throw NotFoundException for an invalid post ID', async () => {
      // Arrange
      const postId = 'invalidPostId';

      // Mock the Prisma Client response
      prismaMock.post.findFirst.mockResolvedValue(null);

      // Act and Assert
      await expect(service.findCommentsByPostId(postId)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.post.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.findFirst).toHaveBeenCalledWith({
        where: { id: postId },
      });
      expect(prismaMock.comments.findMany).not.toHaveBeenCalled();
    });

    it('should create comments', async () => {
      // Arrange
      const postId = 'validPostId';
      const userId = 'validUserId';
      const content = 'Test comment';
      const post = { id: postId };
      const expectedComment = {
        id: 'commentId',
        content,
        userID: userId,
        postID: postId,
      };

      // Mock the Prisma Client responses
      prismaMock.post.findUnique.mockResolvedValue(post);
      prismaMock.comments.create.mockResolvedValue(expectedComment);

      // Act
      const result = await service.createComments(postId, userId, content);

      // Assert
      expect(result).toEqual(expectedComment);
      expect(prismaMock.post.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
      });
      expect(prismaMock.comments.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.comments.create).toHaveBeenCalledWith({
        data: {
          content: undefined,
          userID: userId,
          postID: postId,
        },
      });
    });
  });

  describe('create post', () => {
    it('should create a post and increment 1 on score', async () => {
      const createPostDTO: CreatePostDTO = {
        title: 'Test Title',
        description: 'Test Description',
        image: 'test.jpg',
        content: 'Test Content',
        
      };
      const userID = 'userId';

      const createdPost = await service.createPost(createPostDTO, userID);

      expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.post.create).toHaveBeenCalledWith({
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

      expect(prismaMock.user.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userID },
        data: { score: { increment: 1 } },
      });

      expect(createdPost).toEqual({ id: 'postId', ...fakePosts[0] });
    });
  });
});
