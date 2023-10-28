import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { MeetupsRepository } from '../meetups/meetups.repository';
import { unparse } from 'papaparse';
import * as fs from 'fs';

@Injectable()
export class ReportsService {
  constructor(private readonly meetupsRepository: MeetupsRepository) {}

  public async generatePdf() {
    const meetups = await this.meetupsRepository.getAllMeetupsSimple();
    const res = meetups.map((meetup) => [
      `${meetup.name}, ${meetup.name}, ${meetup.description}, ${
        meetup.place
      }, ${meetup.tags.join(', ')}, ${meetup.long}, ${meetup.lat},`,
    ]);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('meetups.pdf'));
    doc.fontSize(25).text(res.toString(), 100, 100);
    doc.end();
  }

  public async generateCsv() {
    const meetups = await this.meetupsRepository.getAllMeetupsSimple();
    return unparse({
      fields: ['Meetups List'],
      data: meetups.map((meetup) => [
        `${meetup.name}, ${meetup.name}, ${meetup.description}, ${
          meetup.place
        }, ${meetup.tags.join(', ')}, ${meetup.long}, ${meetup.lat},`,
      ]),
    });
  }
}
