import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  REDIRECT_FLAG,
  REDIRECT_PATH,
  REDIRECT_PATH_REG,
} from '../module/ssr-share';

@Controller(REDIRECT_PATH)
export class SsrShareController {
  constructor() { }

  @Get('/some-page')
  getSomePage(@Req() request: Request) {
    console.log('SsrShareController intercepted /some-page', `(redirected url: ${request.url})`);
    const { url } = request;
    const path = url.replace(REDIRECT_PATH_REG, '');
    const pathTick = /\?/.test(path) === false ? '?' : '&';
    // htmlRender(meta.html, viewModel)
    return JSON.stringify(
      {
        title: 'Foo some-page Title ~~~~~~~~~~~~~~~',
        description: 'Bar some-page description ~~~~~~~~~~~~~',
        origin: path,
        refresh: `${path}${pathTick}${REDIRECT_FLAG}`,
      },
      null,
      2,
    );
  }
}
