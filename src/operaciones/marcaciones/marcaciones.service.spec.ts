import { Test, TestingModule } from '@nestjs/testing';
import { MarcacionesService } from './marcaciones.service';

describe('MarcacionesService', () => {
  let service: MarcacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarcacionesService],
    }).compile();

    service = module.get<MarcacionesService>(MarcacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
