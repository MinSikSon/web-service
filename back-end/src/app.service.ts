import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postHello(id: string, pw: number): string {
    console.log(`postHello ${id} ${pw}`);
    return `post: ${id}, ${pw}`;
  }
}
