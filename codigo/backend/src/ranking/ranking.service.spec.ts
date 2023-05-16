import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RankingService } from './ranking.service';

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
});
