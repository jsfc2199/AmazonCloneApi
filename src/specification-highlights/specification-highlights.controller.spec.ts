import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationHighlightsController } from './specification-highlights.controller';
import { SpecificationHighlightsService } from './specification-highlights.service';

describe('SpecificationHighlightsController', () => {
  let controller: SpecificationHighlightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationHighlightsController],
      providers: [SpecificationHighlightsService],
    }).compile();

    controller = module.get<SpecificationHighlightsController>(SpecificationHighlightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
