import { Test, TestingModule } from '@nestjs/testing';
import { RootService } from './root.service';

describe('RootService', () => {
  let service: RootService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RootService],
    }).compile();

    service = module.get<RootService>(RootService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("health", () => {
    it('should return ping', () => {
      const mock = 'ping'

      const result = jest.spyOn(service, 'health').mockImplementation(() => mock);
      const implemented = service.health()

      expect(result).toHaveBeenCalledTimes(1);
      expect(implemented).toEqual(mock)

      result.mockReset();
      result.mockRestore();
    })

    it('should return pong', () => {
      const mock = 'pong';

      const result = jest.spyOn(service, 'healthCheck').mockImplementation((): string => mock);
      const implemented = service.healthCheck()

      expect(result).toHaveBeenCalledTimes(1);
      expect(implemented).toEqual(mock)
    })
  })
});
