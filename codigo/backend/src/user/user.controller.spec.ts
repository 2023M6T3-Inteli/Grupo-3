import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../guards/admin.guard';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';

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
    createdAt: new Date(),
    updatedAt: new Date(),
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
        CaslAbilityFactory
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
    it('should get all users',async () => {
      const findAllSpy = jest.spyOn(userService, 'getAllUsers').mockResolvedValue(fakeUsers);
      const response = await userController.getAllUsers();

      expect(userService.getAllUsers).toBeCalledTimes(1);
      expect(response).toEqual(fakeUsers);
    })

    // it('should get an unique user by its username',async () => {
    //   // const findAllSpy = jest.spyOn(userService, 'findByUsername').mockResolvedValue(fakeUsers);
    //   const response = await userController.findByUsername(fakeUsers[0].username);

    //   expect(userService.findByUsername).toBeCalled();
    //   expect(response).toEqual(fakeUsers);
    // })
   })

  describe('getAllUsers', () => { 
    it('should get all users',async () => {
      const findAllSpy = jest.spyOn(userService, 'getAllUsers').mockResolvedValue(fakeUsers);
      const response = await userController.getAllUsers();

      expect(userService.getAllUsers).toBeCalledTimes(1);
      expect(response).toEqual(fakeUsers);
    })
   })
});
