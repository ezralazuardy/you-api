import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the sample of You App RESTful API! - made by @ezralazuardy.';
  }
}
