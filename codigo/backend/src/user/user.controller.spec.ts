import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { AdminGuard } from '../guards/admin.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Criamos primeiro nos dados fícticios para serem retornados do Prisma
const fakeUsers = [
  {
    id: 'userId',
    name: 'Primeiro',
    score: 11,
    image: 'true.png',
    email: 'this@email.com',
    admin: false,
    location: '',
    role: '',
    hashedPassword: '',
    acceptTerms: true,
    curriculum: '',
    username: 'unique',
    hashedRt: '',
    comments: [],
    likes: [],
    tags: [],
    userPost: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'userId2',
    name: 'Segundo',
    score: 11,
    image: 'true.png',
    email: 'that@email.com',
    admin: false,
    location: '',
    role: '',
    hashedPassword: '',
    acceptTerms: true,
    curriculum: '',
    username: 'non-unique',
    hashedRt: '',
    comments: [],
    likes: [],
    tags: [],
    userPost: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fakeAdminUsers = [
  {
    id: 'userId3',
    name: 'Terceiro',
    score: 11,
    image: 'true.png',
    email: 'this@email.com',
    admin: true,
    location: '',
    role: '',
    hashedPassword: '',
    acceptTerms: true,
    curriculum: '',
    username: 'unique3',
    hashedRt: '',
    comments: [],
    likes: [],
    tags: [],
    userPost: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'userId2',
    name: 'Segundo',
    score: 11,
    image: 'true.png',
    email: 'that@email.com',
    admin: true,
    location: '',
    role: '',
    hashedPassword: '',
    acceptTerms: true,
    curriculum: '',
    username: 'non-unique',
    hashedRt: '',
    comments: [],
    likes: [],
    tags: [],
    userPost: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fakeTags = [
  {
    id: 'tagID',
    postID: 'postID',
    subject: 'NodeJS',
    userID: 'userID',
  },
];

// E depois nosso objeto de mock do Prisma, retornando os dados falsos
const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(fakeUsers[0]),
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findUnique: jest.fn().mockResolvedValue(fakeUsers[0]),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
    delete: jest.fn(), // o método delete não retorna nada
  },
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
        AdminGuard,
        CaslAbilityFactory,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('get user', () => {
    it('should get all users', async () => {
      jest
        .spyOn(userService, 'getAllUsers')
        .mockImplementation(async () => fakeUsers);
      const response = await userController.getAllUsers();

      expect(userService.getAllUsers).toBeCalledTimes(1);
      expect(response).toEqual(fakeUsers);
    });

    it('should get an unique user by its username', async () => {
      jest
        .spyOn(userService, 'findByUsername')
        .mockImplementation(async () => fakeUsers[0]);
      const response = await userController.findByUsername('unique');

      expect(userService.findByUsername).toBeCalled();
      expect(response).toEqual(fakeUsers[0]);
    });

    it('should get admin users', async () => {
      jest
        .spyOn(userService, 'getAdminUsers')
        .mockImplementation(async () => fakeAdminUsers);
      const response = await userController.getAdmin('userId3');

      expect(userService.getAdminUsers).toBeCalled();
      expect(response).toEqual(fakeAdminUsers);
    });

    it('should not get admin users if the currentUser is not admin', async () => {
      jest
        .spyOn(userService, 'getAdminUsers')
        .mockImplementation(async () => fakeUsers);
      try {
        await userController.getAdmin('userId');
        expect(userService.getAdminUsers).toBeCalled();
      } catch (error) {
        expect(error).not.toEqual(fakeAdminUsers);
      }
    });
  });

  describe('delete user', () => {
    it('should not delete user if user does not exist', async () => {
      jest.spyOn(userService, 'deleteUser').mockRejectedValue(new Error());
      try {
        const response = await userService.deleteUser('userId80', 'userId3');

        expect(response).toBeCalledTimes(1);
        expect(response).not.toEqual(fakeUsers[0]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
    it('should not delete user if the currentUser is not admin', async () => {
      jest.spyOn(userService, 'deleteUser').mockRejectedValue(new Error());
      try {
        const response = await userService.deleteUser('userId3', 'userId');

        expect(response).toBeCalledTimes(1);
        expect(response).toEqual(fakeUsers[0]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
    it('should not delete yourself', async () => {
      jest.spyOn(userService, 'deleteUser').mockRejectedValue(new Error());
      try {
        const response = await userService.deleteUser('userId3', 'userId3');

        expect(response).toBeCalledTimes(1);
        expect(response).toEqual(fakeAdminUsers[0]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
    it('should delete an user', async () => {
      try {
        const response = await userService.deleteUser('userId', 'userId3');

        expect(response).toBeCalledTimes(1);
        expect(response).toEqual(fakeUsers[0]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('tags', () => {
    it('should get all tags', async () => {
      jest
        .spyOn(userService, 'getAllTags')
        .mockImplementation(async () => fakeTags);
      const response = await userController.getAllTags();

      expect(userService.getAllTags).toBeCalledTimes(1);
      expect(response).toBe(fakeTags)
    });
  });
});
