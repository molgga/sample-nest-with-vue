export const REDIRECT_PATH = '/ssr/share';

export const REDIRECT_PATH_REG = /^\/ssr\/share/;

export const REDIRECT_FLAG = '__rsr';

export const BOT_MATCHER = Symbol('BOT_MATCHER');

export const BOT_MATCHER_CONFIG = Symbol('BOT_MATCHER_CONFIG');

export const BOT_AGENTS = Symbol('BOT_AGENTS');

export interface BotMatcherConfig {
  redirectPath?: string;
  agents?: RegExp[];
  excludes?: RegExp[];
}

export interface UriQuery {
  [key: string]: any;
}

export interface BotMatcher {
  isBotAgent(agent: string): boolean;
  hasIgnoreQuery?(query: UriQuery): boolean;
}
