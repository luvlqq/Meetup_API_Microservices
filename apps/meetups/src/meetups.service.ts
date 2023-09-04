import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetupsService {
  getHello(): string {
    return 'Hello World!';
  }
}
