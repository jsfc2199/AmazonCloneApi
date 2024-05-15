import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpecificationHighlightDto } from './dto/create-specification-highlight.dto';
// import { UpdateSpecificationHighlightDto } from './dto/update-specification-highlight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecificationHighlight } from './entities/specification-highlight.entity';
import { Repository } from 'typeorm';
import { ErrorHandler } from 'src/common/errors/errors-handler';
import { isUUID } from 'validator';

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

  async findOne(id: string) {
    let specificationHighlight: SpecificationHighlight;
    if (isUUID(id)) {
      specificationHighlight =
        await this.specificationHighlightRepository.findOne({
          where: {
            uuid: id,
          },
        });
    }
    if (!specificationHighlight)
      throw new BadRequestException(`The id: ${id} is not an UUID`);
    return specificationHighlight;
  }

  async deleteAllSpecHighlights() {
    try {
      const query =
        this.specificationHighlightRepository.createQueryBuilder('specHigh');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  // findAll() {
  //   return `This action returns all specificationHighlights`;
  // }

  // update(id: number, updateSpecificationHighlightDto: UpdateSpecificationHighlightDto) {
  //   return `This action updates a #${id} specificationHighlight`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} specificationHighlight`;
  // }
}
