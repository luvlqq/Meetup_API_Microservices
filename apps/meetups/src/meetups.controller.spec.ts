import { Test, TestingModule } from '@nestjs/testing';
import { MeetupsController } from './meetups.controller';
import { MeetupsService } from './meetups.service';

describe('MeetupsController', () => {
  let meetupsController: MeetupsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MeetupsController],
      providers: [MeetupsService],
    }).compile();

    meetupsController = app.get<MeetupsController>(MeetupsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(meetupsController.getHello()).toBe('Hello World!');
    });
  });
});
