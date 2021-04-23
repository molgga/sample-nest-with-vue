import { APP_INTERCEPTOR } from '@nestjs/core';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BOT_MATCHER_CONFIG, BOT_MATCHER, BotMatcherConfig } from './types';
import { SsrBotMatcher } from './ssr-bot-matcher';
import { SsrShareInterceptor } from './ssr-share.interceptor';

/**
 * User-agent 로 intercept 해서 특정 controller 로 보내는 용도
 * 
 * 예)
 *  /some-page -> interceptor (condition:redirect) 
 *   -> /ssr/share/some-page -> interceptor (condition:next)
 *   -> /ssr/share/some-page 이 등록된 controller 에서 할것 처리.
 */
@Module({})
export class SsrShareModule {
  static register(config?: BotMatcherConfig): DynamicModule {
    const providers: Provider[] = [
      { provide: BOT_MATCHER, useClass: SsrBotMatcher },
      { provide: APP_INTERCEPTOR, useClass: SsrShareInterceptor },
    ];
    if (config) {
      providers.push({ provide: BOT_MATCHER_CONFIG, useValue: config });
    }
    return {
      module: SsrShareModule,
      providers,
    };
  }
}
