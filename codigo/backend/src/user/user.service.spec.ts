import { BadGatewayException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

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
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
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
  });

  describe('create', () => {
    it('should return BadGatewayException if the email already exists', async () => {
      const existingUser = {
        id: 'userId2',
        name: 'Primeiro',
        score: 11,
        image: 'true.png',
        email: 'first@email.com',
        admin: false,
        location: '',
        role: '',
        hashedPassword: '',
        acceptTerms: true,
        curriculum: '',
        username: 'unique2',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await expect(service.createUser(existingUser)).rejects.toThrow(
        BadGatewayException,
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: existingUser.email },
      });
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('should throw BadGatewayException if username already exists', async () => {
      const existingUsername = 'existinguser';
      const createUserDTO = {
        id: 'userId2',
        name: 'Primeiro',
        score: 11,
        image: 'true.png',
        email: 'aus@email.com',
        admin: false,
        location: '',
        role: '',
        hashedPassword: '',
        acceptTerms: true,
        curriculum: '',
        username: existingUsername,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockResolvedValue({ ...createUserDTO });

      await expect(service.createUser(createUserDTO)).rejects.toThrow(
        BadGatewayException,
      );

      expect(prisma.user.findUnique).toHaveBeenCalled();
    });

    // it('should create user', async () => {
    //   const createUserDTO = {
    //     id: 'userId2',
    //     name: 'Primeiro',
    //     score: 11,
    //     image: 'true.png',
    //     email: 'aus@email.com',
    //     admin: false,
    //     location: '',
    //     role: '',
    //     hashedPassword: undefined,
    //     acceptTerms: true,
    //     curriculum: '',
    //     username: 'existingUsername',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const createdUser: User = {
    //     email: createUserDTO.email,
    //     name: createUserDTO.name || '',
    //     acceptTerms: createUserDTO.acceptTerms || true,
    //     admin: createUserDTO.admin || false,
    //     username: createUserDTO.username,
    //     role: createUserDTO.role || '',
    //     score: createUserDTO.score || 0,
    //     image: createUserDTO.image || '',
    //     curriculum: createUserDTO.curriculum || '',
    //     hashedPassword: createUserDTO.hashedPassword,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     id: createUserDTO.id,
    //     location: createUserDTO.location || '',
    //   };
    //   jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    //   jest.spyOn(prisma.user, 'create').mockResolvedValue(createdUser);

    //   const result = await service.createUser(createUserDTO);

    //   jest.spyOn(bcrypt, 'hash').mockImplementation((data: string) => Promise.resolve(`hashed-${data}`));

    //   expect(result).toEqual(createdUser);
    //   expect(prisma.user.findUnique).toHaveBeenCalledWith({
    //     where: { email: createUserDTO.email },
    //   });
    //   expect(prisma.user.findUnique).toHaveBeenCalledWith({
    //     where: { username: createUserDTO.username },
    //   });
    //   expect(prisma.user.create).toHaveBeenCalledWith({
    //     data: {
    //       email: createUserDTO.email,
    //       username: createUserDTO.username,
    //       hashedPassword: expect.stringMatching(/^hashed-/),
    //       id: createUserDTO.id,
    //       name: createUserDTO.name,
    //       ...createdUser,
    //     },
    //   });
    // });
  });
});
