import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }

  public async create(data: any) {
    console.log('create... ', data);
  }
}
