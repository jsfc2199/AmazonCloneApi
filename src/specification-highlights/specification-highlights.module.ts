import { Module } from '@nestjs/common';
import { SpecificationHighlightsService } from './specification-highlights.service';
import { SpecificationHighlightsController } from './specification-highlights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificationHighlight } from './entities/specification-highlight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificationHighlight])],
  controllers: [SpecificationHighlightsController],
  providers: [SpecificationHighlightsService],
  exports: [SpecificationHighlightsService],
})
export class SpecificationHighlightsModule {}
