import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { RankingService } from './ranking.service';
import { NotFoundException } from '@nestjs/common';

// Criamos primeiro nos dados fícticios para serem retornados do Prisma
const fakeUsers = [
  {
    id: '1',
    name: 'Primeiro',
    score: 10,
    image: 'true.png',
  },
  {
    id: '2',
    name: 'Testes',
    score: 5,
    image: 'true.png',
  },
  {
    id: '3',
    name: 'Javascript',
    score: 0,
    image: 'false.png',
  },
];

// E depois nosso objeto de mock do Prisma, retornando os dados falsos
const prismaMock = {
  user: {
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findUnique: jest.fn().mockResolvedValue(fakeUsers[0]),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
  },
};

describe('RankingService', () => {
  let rankingService: RankingService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    rankingService = module.get<RankingService>(RankingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return 10 users', async () => {
      const response = await rankingService.findAll();
      const expected = {
        orderBy: {
          score: 'desc',
        },
        select: {
          id: true,
          name: true,
          score: true,
          image: true,
        },
        take: 10,
      };

      expect(response).toEqual(fakeUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.user.findMany).toHaveBeenCalledWith(expected);
    });
  });

  describe('addScore', () => {
    it('should increment the score of the user', async () => {
      const userId = '1';
      const user = {
        id: userId,
        name: 'Test User',
        score: 5,
        image: 'user.png',
      };
  
      // Mock the user findUnique and user update methods
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.user.update.mockImplementation(async ({ where, data }) => {
        if (where.id === userId) {
          return { ...user, score: user.score + 1 };
        }
      });
  
      const updatedUser = await rankingService.addScore(userId);
  
      expect(updatedUser.score).toEqual(user.score + 1);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(prisma.user.update).toHaveBeenCalledTimes(1);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { score: user.score + 1 },
      });
    });
  
    it('should throw an error if the user does not exist', async () => {
      const userId = '1';
  
      // Mock the user findUnique to return null
      prismaMock.user.findUnique.mockResolvedValue(null);
  
      await expect(rankingService.addScore(userId)).rejects.toThrow("User doesn't exist");
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
  
});
