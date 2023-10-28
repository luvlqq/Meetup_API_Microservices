import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UPLOAD_IMAGE } from '../users/constants';

@Injectable()
export class UploadsGatewayService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  public async uploadImage(userId: number, file: Express.Multer.File) {
    return await lastValueFrom(
      this.authClient.send(UPLOAD_IMAGE, { userId, file }),
    );
  }
}
