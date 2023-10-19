import { google } from 'googleapis';
import { Injectable } from '@nestjs/common';
import { googleDriveFolderId } from './constants';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { UploadsRepository } from './uploads.repository';

@Injectable()
export class UploadsService {
  private drive;

  constructor(private readonly repository: UploadsRepository) {
    const auth = new google.auth.GoogleAuth({
      keyFile: './google_drive.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });
  }

  public async uploadImage(
    userId: number,
    file: Express.Multer.File,
  ): Promise<boolean> {
    try {
      const { originalname, buffer } = file;

      const fileBuffer = Buffer.from(buffer);

      const media = {
        mimeType: file.mimetype,
        body: Readable.from([fileBuffer]),
      };

      const driveResponse = await this.drive.files.create({
        requestBody: {
          name: originalname,
          mimeType: file.mimetype,
          parents: [googleDriveFolderId],
        },
        media: media,
      });

      const fileId = driveResponse.data.id;
      const link = `https://drive.google.com/uc?id=${fileId}`;
      await this.repository.addImageToUser(userId, link);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
