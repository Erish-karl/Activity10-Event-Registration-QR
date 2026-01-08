import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // no path prefix
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // default route
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test') // ← THIS IS THE NEW ROUTE
  getTest() {
    return { message: 'Backend is working!' };
  }
}
