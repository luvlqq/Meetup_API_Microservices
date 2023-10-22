import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ELASTIC, SIMPLE } from '../meetups/constants';

@Injectable()
export class ElasticGatewayService {
  constructor(@Inject('MEETUPS') private meetupClient: ClientProxy) {}

  public async smartFindMeetups(search: string) {
    return await lastValueFrom(this.meetupClient.send(ELASTIC, { search }));
  }

  public async simpleFind() {
    return await lastValueFrom(this.meetupClient.send(SIMPLE, {}));
  }
}
