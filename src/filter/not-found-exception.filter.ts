import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

/**
 * 404 not found 처리.
 * ServeStaticModule 과 같이 모든 경로를 index.html 로 내리는 방식으로 처리하는 경우는 서버에서 404 처리는 필요가 없긴하지만,
 * ServeStaticModule 에서 특정 경로는 exclude 하게되면, 해당 경로들은 404 처리를 해당 필터에서 처리가 됨.
 */
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const httpHost = host.switchToHttp();
    const response = httpHost.getResponse<Response>();
    response.sendFile(path.join(__dirname, '../assets/error-404.html')); // nest-cli.json config assets
  }
}
