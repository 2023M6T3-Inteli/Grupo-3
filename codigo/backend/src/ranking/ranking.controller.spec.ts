import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { PrismaService } from '../prisma/prisma.service';

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

const prismaServiceMock = {
  user: {
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findUnique: jest.fn().mockResolvedValue(fakeUsers[0]),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
  },
};

describe('RankingController', () => {
  let rankingController: RankingController;
  let rankingService: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        RankingService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    rankingController = module.get<RankingController>(RankingController);
    rankingService = module.get<RankingService>(RankingService);
  });

  describe('findAll', () => {
    it('should return a list of ranked users', async () => {
      const findAllSpy = jest.spyOn(rankingService, 'findAll').mockResolvedValue(fakeUsers);

      const response = await rankingController.findAll();

      expect(rankingService.findAll).toHaveBeenCalledTimes(1);
      expect(response).toEqual(fakeUsers);

      findAllSpy.mockRestore();
    });
  });
});