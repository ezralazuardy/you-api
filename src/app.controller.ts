import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Welcome to the sample of You App RESTful API! - made by @ezralazuardy.';
  }
}
