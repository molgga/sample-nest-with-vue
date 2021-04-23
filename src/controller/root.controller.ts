import { Controller, Get, Next } from '@nestjs/common';
import { NextFunction } from 'express';

@Controller()
export class RootController {
  constructor() { }

  @Get('/health-check')
  getHello() {
    return 'OK';
  }

  @Get('*')
  getAll(@Next() next: NextFunction) {
    next();
  }
}
