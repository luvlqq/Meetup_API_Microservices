import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsGatewayService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from '../auth/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('upload')
export class UploadsGatewayController {
  constructor(private readonly uploadsService: UploadsGatewayService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  public async uploadImage(
    @GetCurrentUserId(ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadsService.uploadImage(userId, file);
  }
}
