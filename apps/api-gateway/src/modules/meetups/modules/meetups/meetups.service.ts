import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { lastValueFrom } from 'rxjs';
import {
  ALL_MEETUPS,
  CHANGE_INFO,
  CREATE_MEETUP,
  DELETE_MEETUP,
  GENERATE_CSV,
  GET_MEETUP_BY_CORDS,
  MEETUP_BY_ID,
} from './constants';
import { MeetupResponse } from './response';
import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { PrismaService } from '@app/common/db/prisma.service';

@Injectable()
export class MeetupsService {
  constructor(
    @Inject('MEETUPS') private meetupClient: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  public async getAllMeetups(
    dto: GetMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(this.meetupClient.send(ALL_MEETUPS, { dto }));
  }

  public async getMeetupsByCords(long: number, lat: number) {
    return await lastValueFrom(
      this.meetupClient.send(GET_MEETUP_BY_CORDS, { long, lat }),
    );
  }

  public async getMeetupById(id: number): Promise<MeetupResponse | string> {
    return await lastValueFrom(this.meetupClient.send(MEETUP_BY_ID, { id }));
  }

  public async createAMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(CREATE_MEETUP, {
        userId,
        dto,
      }),
    );
  }

  public async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(CHANGE_INFO, { userId: userId, id: id, dto: dto }),
    );
  }

  public async deleteMeetupById(
    userId: number,
    id: number,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(DELETE_MEETUP, { userId: userId, id: id }),
    );
  }

  public async generateCsv() {
    return await lastValueFrom(this.meetupClient.send(GENERATE_CSV, {}));
  }

  // public async generatePdf() {
  //   return await lastValueFrom(this.meetupClient.send(GENERATE_PDF, {}));
  // }

  public async generatePdf() {
    const data = await this.prisma.meetup.findMany();
    Logger.log(data);
    const doc = new PDFDocument();
    const outputPath = 'meetups.pdf';
    const stream = createWriteStream(outputPath);
    doc.pipe(stream);

    // Заполните PDF-документ данными
    data.forEach((meetup) => {
      doc.fontSize(14).text(`Meetup Name: ${meetup.name}`);
      doc.fontSize(12).text(`Description: ${meetup.description}`);
      doc.fontSize(12).text(`Tags: ${meetup.tags.join(', ')}`);
      doc.fontSize(12).text(`Place: ${meetup.place}`);

      // Проверка на числовое значение long и lat
      if (typeof meetup.long === 'number' && typeof meetup.lat === 'number') {
        doc.fontSize(12).text(`Longitude: ${meetup.long}`);
        doc.fontSize(12).text(`Latitude: ${meetup.lat}`);
      } else {
        // Если meetup.long или meetup.lat не являются числовыми значениями
        doc.fontSize(12).text('Invalid longitude or latitude');
      }

      // Проверка на дату (предполагая, что meetup.date - это объект Date)
      if (meetup.date instanceof Date) {
        doc.fontSize(12).text(`Date: ${meetup.date.toISOString()}`);
      } else {
        // Если meetup.date не является объектом Date
        doc.fontSize(12).text('Invalid date');
      }

      doc.moveDown(); // Перейти на следующую строку
    });

    doc.end();
  }
}
