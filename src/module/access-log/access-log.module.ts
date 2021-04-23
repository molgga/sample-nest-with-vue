import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { AccessLoggerMiddleware } from './access-logger.middleware';

@Module({})
export class AccessLogModule implements NestModule {
  static register(): DynamicModule {
    const providers: Provider[] = [];
    return {
      module: AccessLogModule,
      providers,
    };
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLoggerMiddleware).forRoutes('*');
  }
}
