import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

export class ErrorHandler {
  private static readonly logger = new Logger();

  static handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(`Error: ${error.detail}`);
    if (error instanceof EntityNotFoundError) {
      const entityClass = this.extractEntity(error.message);
      const whereJson = JSON.stringify(error.criteria);
      throw new NotFoundException(
        `The requested information for the type class: ${entityClass} with some of the following properties: ${whereJson} was not found`,
      );
    }

    this.logger.error(error);
    throw new InternalServerErrorException(`Unexpected error. Check logs`);
  }

  private static extractEntity(message: string) {
    const match = message.match(/type "(.*?)" matching/);
    return match ? match[1] : 'Unknown';
  }
}
