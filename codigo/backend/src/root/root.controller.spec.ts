import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from './root.controller';
import { RootService } from './root.service';

describe('RootController', () => {
  let controller: RootController;
  let service: RootService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [RootService],
    }).compile();

    controller = module.get<RootController>(RootController);
    service = module.get<RootService>(RootService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('health', () => {
    it('health should return ping', () => {
      const mock = 'ping'

      jest.spyOn(service, 'health').mockImplementation(() => mock);
      const response = controller.health();

      expect(service.health).toBeCalledTimes(1);
      expect(response).toEqual(mock);
    });
    it('health should return pong', () => {
      const mock = 'pong'

      jest.spyOn(service, 'healthCheck').mockImplementation(() => mock);
      const response = controller.healthCheck();

      expect(service.healthCheck).toBeCalledTimes(1);
      expect(response).toEqual(mock);
    });
  });
});
