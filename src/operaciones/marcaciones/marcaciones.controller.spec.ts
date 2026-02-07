import { Test, TestingModule } from '@nestjs/testing';
import { MarcacionesController } from './marcaciones.controller';

describe('MarcacionesController', () => {
  let controller: MarcacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcacionesController],
    }).compile();

    controller = module.get<MarcacionesController>(MarcacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
