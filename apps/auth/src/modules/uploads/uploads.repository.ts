import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/db/prisma.service';

@Injectable()
export class UploadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addImageToUser(userId: number, file: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { userImage: file },
    });
  }
}
