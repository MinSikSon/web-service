import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('id') id: string, @Query('pw') pw: number): string {
    console.log(id, pw);
    return this.appService.getHello();
  }
  @Post()
  postHello(@Query('id') id: string, @Query('pw') pw: number): string {
    console.log(id, pw);
    return this.appService.postHello(id, pw);
  }
}
