import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
