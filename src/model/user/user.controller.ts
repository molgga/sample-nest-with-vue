import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

/**
 * typeorm 사용 예
 */
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Post('')
  create(@Body() user: { userName: string }) {
    console.log(user);
    return this.userService.create(user);
  }

  @Delete(':/id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
