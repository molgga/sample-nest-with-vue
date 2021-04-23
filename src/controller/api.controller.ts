import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class ApiController {
  constructor() {}

  @Get('/foo')
  getHello() {
    return {
      hello: 'api',
      foo: 'bar',
      isWithNestjs: true,
    };
  }
}
