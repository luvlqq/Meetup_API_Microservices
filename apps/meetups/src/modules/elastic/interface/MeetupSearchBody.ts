import { MeetupResponse } from '../../meetups/response';

export interface IMeetupsSearchBody {
  hits: {
    total: number;
    hits: Array<{
      _source: MeetupResponse;
    }>;
  };
}
