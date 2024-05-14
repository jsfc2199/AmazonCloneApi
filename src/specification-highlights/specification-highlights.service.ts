import { Injectable } from '@nestjs/common';
import { CreateSpecificationHighlightDto } from './dto/create-specification-highlight.dto';
import { UpdateSpecificationHighlightDto } from './dto/update-specification-highlight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecificationHighlight } from './entities/specification-highlight.entity';
import { Repository } from 'typeorm';
import { ErrorHandler } from 'src/common/errors/errors-handler';

@Injectable()
export class SpecificationHighlightsService {
  constructor(
    @InjectRepository(SpecificationHighlight)
    private readonly specificationHighlightRepository: Repository<SpecificationHighlight>,
  ) {}
  async create(
    createSpecificationHighlightDto: CreateSpecificationHighlightDto,
  ) {
    try {
      const specificationHighlights =
        this.specificationHighlightRepository.create(
          createSpecificationHighlightDto,
        );
      const specificationHighlightsToSave =
        await this.specificationHighlightRepository.save(
          specificationHighlights,
        );
      return specificationHighlightsToSave;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  // findAll() {
  //   return `This action returns all specificationHighlights`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} specificationHighlight`;
  // }

  // update(id: number, updateSpecificationHighlightDto: UpdateSpecificationHighlightDto) {
  //   return `This action updates a #${id} specificationHighlight`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} specificationHighlight`;
  // }
}
