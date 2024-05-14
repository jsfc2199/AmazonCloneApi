import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationHighlightsService } from './specification-highlights.service';

describe('SpecificationHighlightsService', () => {
  let service: SpecificationHighlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecificationHighlightsService],
    }).compile();

    service = module.get<SpecificationHighlightsService>(SpecificationHighlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
