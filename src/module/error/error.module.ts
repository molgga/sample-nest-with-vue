import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ErrorService } from './error.service';

@Module({
  imports: [],
  providers: [ErrorService],
  controllers: [],
  exports: [ErrorService],
})
export class ErrorModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
