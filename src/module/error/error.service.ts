import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMeta } from './error.types';

@Injectable()
export class ErrorService {
  badRequest(error: ErrorMeta = {}) {
    const { message = 'Bad request' } = error;
    throw new HttpException({ status: HttpStatus.BAD_REQUEST, message }, HttpStatus.BAD_REQUEST);
  }
}
