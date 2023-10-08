import { Injectable, Logger } from '@nestjs/common';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { Meetup, Prisma, User } from '@prisma/client';
import { PrismaService } from '@app/common/db/prisma.service';
import { MeetupResponse } from './response';

@Injectable()
export class MeetupsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getMeetupById(id: number): Promise<MeetupResponse> {
    return this.prisma.meetup.findUnique({ where: { id: id } });
  }

  public async getAllMeetups(dto: GetMeetupDto): Promise<MeetupResponse[]> {
    const where: Prisma.MeetupWhereInput = {
      name: { contains: dto.name || undefined },
      date: {
        gte: dto.from ? new Date(dto.from) : undefined,
        lte: dto.to ? new Date(dto.to) : undefined,
      },
    };

    const query: Prisma.MeetupFindManyArgs = {
      where,
      orderBy: {
        date: dto.sort || undefined,
      },
      take: +dto.limit || 1,
      skip: (dto.page - 1) * dto.limit || undefined,
    };

    return this.prisma.meetup.findMany(query);
  }

  public async getMeetupsByCords(long: number, lat: number) {
    Logger.log(`Coords: ${long}, ${lat}`);
    try {
      const meetups = await this.prisma.meetup.findMany({
        where: {
          AND: {
            long: {
              gte: long - 0.1,
              lte: long + 0.1,
            },
            lat: {
              gte: lat - 0.1,
              lte: lat + 0.1,
            },
          },
        },
      });
      return meetups;
    } catch (e) {
      throw e;
    }
  }

  public async createAMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse> {
    return this.prisma.meetup.create({
      data: { ...dto, meetupCreator: userId },
    });
  }

  public async deleteMeetupById(
    userId: number,
    id: number,
  ): Promise<MeetupResponse> {
    return this.prisma.meetup.delete({ where: { id: id } });
  }

  public async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    return this.prisma.meetup.update({ where: { id: id }, data: dto });
  }

  public async getUserRole(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  public async getMeetupOwnerId(id: number): Promise<Meetup> {
    return this.prisma.meetup.findUnique({
      where: { id: id },
    });
  }
}
