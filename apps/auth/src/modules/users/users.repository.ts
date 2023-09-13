import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/common/db/prisma.service';
import { Meetup } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserInfo(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { followedMeetups: true, createdMeetups: true },
    });
  }

  public async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<Meetup> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          followedMeetups: { connect: { id: meetupId } },
        },
      });
      return this.prisma.meetup.findUnique({ where: { id: meetupId } });
    } catch (e) {
      Logger.error(e);
      return e;
    }
  }
}
