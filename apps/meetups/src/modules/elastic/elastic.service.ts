import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MeetupResponse } from '../meetups/response';
import { IMeetupsSearchBody } from './interface';

@Injectable()
export class ElasticMicroserviceService {
  index = 'meetups';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async indexMeetups(meetup: MeetupResponse) {
    return this.elasticsearchService.index<MeetupResponse>({
      index: this.index,
      body: {
        id: meetup.id,
        name: meetup.name,
        description: meetup.description,
        place: meetup.place,
        date: meetup.date,
        long: meetup.long,
        lat: meetup.lat,
        tags: meetup.tags,
        meetupCreator: meetup.meetupCreator,
      },
    });
  }

  public async searchMeetups(query: string) {
    const body = await this.elasticsearchService.search<IMeetupsSearchBody>({
      index: this.index,
      body: {
        query: {
          match: {
            name: query,
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
