import { BadGatewayException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

// Criamos primeiro nos dados fícticios para serem retornados do Prisma
const fakeUsers = [
  {
    id: 'userId',
    name: 'Primeiro',
    score: 11,
    image: 'true.png',
    email: 'this@email.com',
    admin: true,
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

const fakeAdminUsers = [
  {
    id: 'userId3',
    name: 'third',
    score: 12,
    image: 'true.png',
    email: 'this@email.com',
    admin: true,
    location: '',
    role: '',
    hashedPassword: '',
    acceptTerms: true,
    curriculum: '',
    username: '3notunique',
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

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('get users', () => {
    it('should get all users', async () => {
      const response = await service.getAllUsers();

      expect(response).toEqual(fakeUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should find by username', async () => {
      const response = await service.findByUsername(fakeUsers[0].username);

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should find by email', async () => {
      const response = await service.findByUsername(fakeUsers[0].email);

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should find by id', async () => {
      const response = await service.findByUsername(fakeUsers[0].id);

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should not find if id does not exist', async () => {
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockRejectedValue(new BadGatewayException());

      try {
        await service.findOne('id_inexistente');
      } catch (error) {
        expect(error).toBeInstanceOf(BadGatewayException);
        expect(error.message).toBe('Bad Gateway');
      }

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should not find if username does not exist', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error());

      try {
        await service.findOne('username_inexistente');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('');
      }

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should not find if email does not exist', async () => {
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockRejectedValue(new BadGatewayException());

      try {
        await service.findOne('email_inexistente');
      } catch (error) {
        expect(error).toBeInstanceOf(BadGatewayException);
        expect(error.message).toBe('Bad Gateway');
      }

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('admin users', () => {
    it('should get admin users', async () => {
      const response = await service.getAdminUsers();

      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
