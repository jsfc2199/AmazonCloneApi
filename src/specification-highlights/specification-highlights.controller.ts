import {
  Controller,
  Get,
  Post,
  Body,
  // Delete,
  // Patch,
  Param,
} from '@nestjs/common';
import { SpecificationHighlightsService } from './specification-highlights.service';
import { CreateSpecificationHighlightDto } from './dto/create-specification-highlight.dto';
// import { UpdateSpecificationHighlightDto } from './dto/update-specification-highlight.dto';

@Controller('specification-highlights')
export class SpecificationHighlightsController {
  constructor(
    private readonly specificationHighlightsService: SpecificationHighlightsService,
  ) {}

  @Post()
  create(
    @Body() createSpecificationHighlightDto: CreateSpecificationHighlightDto,
  ) {
    return this.specificationHighlightsService.create(
      createSpecificationHighlightDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specificationHighlightsService.findOne(id);
  }

  // @Get()
  // findAll() {
  //   return this.specificationHighlightsService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSpecificationHighlightDto: UpdateSpecificationHighlightDto) {
  //   return this.specificationHighlightsService.update(+id, updateSpecificationHighlightDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.specificationHighlightsService.remove(+id);
  // }
}
