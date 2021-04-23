import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { createConfigEnv } from './app.config';
import { RootController } from './controller/root.controller';
import { ApiController } from './controller/api.controller';
import { SsrShareController } from './controller/ssr-share.controller';
import { SsrShareModule } from './module/ssr-share';
import { AccessLogModule } from './module/access-log';
// import { UserModule } from './model/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(createConfigEnv()),
    AccessLogModule.register(),
    SsrShareModule.register({
      redirectPath: '/ssr/share',
      excludes: [/^\/api*/]
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, './client-dist'),
      exclude: ['/api*'],
    }),
    // UserModule,
  ],
  controllers: [RootController, ApiController, SsrShareController],
})
export class AppModule {
  constructor() { }
}
