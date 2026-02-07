import { Test, TestingModule } from '@nestjs/testing';
import { JornadasController } from './jornadas.controller';

describe('JornadasController', () => {
  let controller: JornadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JornadasController],
    }).compile();

    controller = module.get<JornadasController>(JornadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
