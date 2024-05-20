import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/rating/create-rating.dto';
import { UpdateRatingDto } from './dto/rating/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  async create(createRatingDto: CreateRatingDto) {
    const ratingCreated = this.ratingRepository.create(createRatingDto);
    const ratingSaved = await this.ratingRepository.save(ratingCreated);
    return ratingSaved;
  }

  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
