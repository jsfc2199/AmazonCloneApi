import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export class ErrorHandler {
  private static readonly logger = new Logger();

  static handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(`Error: ${error.detail}`);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error. Check logs');
  }
}
