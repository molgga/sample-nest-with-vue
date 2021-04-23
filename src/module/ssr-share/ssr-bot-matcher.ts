import { Optional, Inject } from '@nestjs/common';
import { BOT_MATCHER_CONFIG, REDIRECT_FLAG, BotMatcherConfig, BotMatcher, UriQuery } from './types';

export class SsrBotMatcher implements BotMatcher {
  constructor(@Optional() @Inject(BOT_MATCHER_CONFIG) private config: BotMatcherConfig) {
    if (config && config.agents && config.agents.length) {
      this.agents = config.agents || [];
    }
  }

  protected agents: RegExp[] = Object.values({
    FACEBOOK: /(^|\s)facebookexternalhit/i,
    KAKAO: /(^|\s)kakaotalk\-Bot/i,
    GOOGLE_BOT: /(^|\s)Googlebot/i,
    SLACK: /(^|\s)Slackbot-LinkExpanding/i,
    YAHOO_SLURP: /(^|\s)Yahoo\!\s+Slurp/i,
    NHN_BOT: /(^|\s)nhnbot/i,
    NAVER_ROBOT: /(^|\s)naverrobot/i,
    BING_BOT: /(^|\s)bingbot/i,
    IA_ACRHIVER: /(^|\s)ia_archiver/i,
    TWITTER_BOT: /(^|\s)twitterbot/i,
    BAIDUSPIDER: /(^|\s)baiduspider/i,
    YANDEX: /(^|\s)yandex/i,
  });

  isBotAgent(agent: string): boolean {
    const checkList = this.agents;
    const len = checkList.length;
    let is = false;
    for (let i = 0; i < len; i++) {
      if (checkList[i].test(agent)) {
        is = true;
        break;
      }
    }
    return is;
  }

  hasIgnoreQuery(query: UriQuery): boolean {
    return query.hasOwnProperty(REDIRECT_FLAG);
  }
}
