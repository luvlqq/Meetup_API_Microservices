import { Controller } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UPLOAD_IMAGE } from '../../../../api-gateway/src/modules/auth/modules/users/constants';

@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @MessagePattern(UPLOAD_IMAGE)
  public async uploadImage(
    @Payload('userId') userId: number,
    @Payload('file') file: Express.Multer.File,
  ) {
    return this.uploadsService.uploadImage(userId, file);
  }
}
