import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Optional,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { BotMatcher, BotMatcherConfig, BOT_MATCHER, BOT_MATCHER_CONFIG } from './types';

@Injectable()
export class SsrShareInterceptor implements NestInterceptor {
  private redirectPath: string = '';
  private redirectPathReg: RegExp;
  private excludes: RegExp[];

  constructor(
    @Optional()
    @Inject(BOT_MATCHER)
    private botMatcher: BotMatcher,

    @Optional()
    @Inject(BOT_MATCHER_CONFIG)
    private config: BotMatcherConfig
  ) {
    const { redirectPath = '/ssr/share', excludes } = this.config || {};
    this.redirectPath = redirectPath;
    this.redirectPathReg = new RegExp(`^${redirectPath}`, 'i');
    this.excludes = excludes || []
  }

  isExcludeByUrl(url: string) {
    const len = this.excludes.length;
    let is = false;
    for (let i = 0; i < len; i++) {
      const exc = this.excludes[i];
      is = exc.test(url);
      if (is) break;
    }
    return is;
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    if (!this.botMatcher) return next.handle();
    const httpHost = context.switchToHttp();
    const request = httpHost.getRequest<Request>();
    const response = httpHost.getResponse<Response>();
    const { url, query = {} } = request;
    const userAgent = request.get('user-agent') || '';
    const isExcludeUrl = this.isExcludeByUrl(url);
    if (isExcludeUrl) {
      return next.handle();
    } else {
      const isNotShareUrl = !this.redirectPathReg.test(url);
      const isNotIgnore = !this.botMatcher.hasIgnoreQuery(query);
      const isBot = this.botMatcher.isBotAgent(userAgent);
      if (isNotShareUrl && isNotIgnore && isBot) {
        response.redirect(`${this.redirectPath}${url}`);
      } else {
        return next.handle();
      }
    }
  }
}
