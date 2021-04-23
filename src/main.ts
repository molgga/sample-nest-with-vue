import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NotFoundExceptionFilter } from 'src/filter/not-found-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  console.log('PORT', PORT);
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  app.useGlobalFilters(new NotFoundExceptionFilter()); // ServeStaticModule 사용시에는 클라이언트에서 404 처리
  await app.listen(PORT);
}
bootstrap();
