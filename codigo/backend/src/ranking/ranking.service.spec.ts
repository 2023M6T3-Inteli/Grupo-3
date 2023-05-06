import { PrismaService } from '../../prisma/prisma.service';
import { RankingService } from './ranking.service';

describe('RankingService', () => {
  let rankingService: RankingService;
  let prismaServiceMock: jest.Mocked<PrismaService>;

  beforeEach(() => {
    prismaServiceMock = {
      user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    } 

    rankingService = new RankingService(prismaServiceMock);
  });

  describe('findAll', () => {
    it('should return ranked users', async () => {
      const mockedRankedUsers = [
        { id: '1', name: 'User 1', score: 10, image: 'image1.jpg' },
        { id: '2', name: 'User 2', score: 5, image: 'image2.jpg' },
      ];

      prismaServiceMock.user.findMany.mockResolvedValue(mockedRankedUsers);

      const rankedUsers = await rankingService.findAll();

      expect(rankedUsers).toEqual(mockedRankedUsers);
      expect(prismaServiceMock.user.findMany).toHaveBeenCalledWith({
        select: { id: true, name: true, score: true, image: true },
        orderBy: { score: 'desc' },
        take: 30,
      });
    });
  });

  describe('addScore', () => {
    it('should add score based on the number of posts', async () => {
      const userId = '1';
      const userWithPosts = {
        id: userId,
        name: 'User 1',
        score: 10,
        userPost: [{ id: 'post1' }, { id: 'post2' }],
      };
      const updatedUser = { ...userWithPosts, score: 12 };

      prismaServiceMock.user.findUnique.mockResolvedValue(userWithPosts);
      prismaServiceMock.user.update.mockResolvedValue(updatedUser);

      const result = await rankingService.addScore(userId);

      expect(result).toEqual(updatedUser);
      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { userPost: true },
      });
      expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { score: userWithPosts.score + userWithPosts.userPost.length },
      });
    });

    it('should throw an error if user does not exist', async () => {
      const userId = '1';
      prismaServiceMock.user.findUnique.mockResolvedValue(null);

      await expect(rankingService.addScore(userId)).rejects.toThrow("User doesn't exist");

      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { userPost: true },
      });
      expect(prismaServiceMock.user.update).not.toHaveBeenCalled();
    });
  });
});