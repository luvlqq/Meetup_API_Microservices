import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GENERATE_CSV, GENERATE_PDF } from '../meetups/constants';

@Injectable()
export class ReportsService {
  constructor(@Inject('MEETUPS') private meetupClient: ClientProxy) {}

  public async generatePdf() {
    return await lastValueFrom(this.meetupClient.send(GENERATE_PDF, {}));
  }

  public async generateCsv() {
    return await lastValueFrom(this.meetupClient.send(GENERATE_CSV, {}));
  }
}
