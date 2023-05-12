import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    postController = app.get<PostController>(PostController);
    postService = app.get<PostService>(PostService);
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDTO: CreatePostDTO = {
        title: 'Test Post',
        description: 'This is a test post.',
        image: 'This is a test post.',
        content: 'This is a test post.',
        active: true,
        comments: {
          id: 'string',
          userID: 'string',
          postID: 'string',
          content: 'string',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(postService, 'createPost').mockResolvedValueOnce({
        id: '1',
        ...createPostDTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await postController.createPost(createPostDTO);
      expect(result).toEqual({
        id: '1',
        ...createPostDTO,
      });
    });
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const posts = [
        {
          title: 'Test Post',
          description: 'This is a test post.',
          image: 'This is a test post.',
          content: 'This is a test post.',
          active: true,
          comments: {
            id: 'string',
            userID: 'string',
            postID: 'string',
            content: 'string',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          id: 'oi',
          createdAt: new Date(),
          updatedAt: new Date(),
          },
          {
            title: '2 Test Post',
            description: '2 This is a test post.',
            image: '2 This is a test post.',
            content: '2 This is a test post.',
            active: true,
            comments: {
              id: '2 string',
              userID: '2 string',
              postID: '2 string',
            content: ' 2 string',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          id: 'oii',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(postService, 'getAllPosts').mockResolvedValueOnce(posts);
      const result = await postController.getAllPosts();
      expect(result).toEqual(posts);
    });
  });
});
