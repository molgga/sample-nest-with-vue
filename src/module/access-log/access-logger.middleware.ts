import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AccessLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, httpVersion } = request;
    const userAgent = request.get('user-agent') || '';
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${ip} ${method} ${url} HTTP/${httpVersion} ${statusCode} ${contentLength} - ${userAgent}`,
      );
    });
    next();
  }
}
