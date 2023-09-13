import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateMeetupDto, UpdateMeetupDto, GetMeetupDto } from './dto';
import { MeetupResponse } from './response';
import { MeetupsRepository } from './meetups.repository';

@Injectable()
export class MeetupsService {
  constructor(
    private readonly repository: MeetupsRepository,
    private readonly logger: Logger,
  ) {}

  public async createAMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    try {
      await this.getUserRole(userId);
      const result = await this.repository.createAMeetup(userId, dto);
      this.logger.log('Create a meetup: ', result);
      return result;
    } catch (e) {
      await this.logger.error(e);
      return e;
    }
  }

  public async getAllMeetups(
    dto: GetMeetupDto,
  ): Promise<MeetupResponse[] | string> {
    try {
      const result = await this.repository.getAllMeetups(dto);
      this.logger.log('Show all meetups');
      return result;
    } catch (e) {
      await this.logger.error(e);
      return e;
    }
  }

  public async getMeetupById(id: number): Promise<MeetupResponse | string> {
    try {
      const result = await this.findMeetupById(id);
      this.logger.log(`Get meetup by id. Id: ${id}`);
      return result;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  public async deleteMeetupById(
    userId: number,
    id: number,
  ): Promise<MeetupResponse | string> {
    try {
      await this.getUserRole(userId);
      await this.findMeetupById(+id);
      await this.compareUserIdAndMeetupId(userId, id);
      const result = await this.repository.deleteMeetupById(userId, id);
      this.logger.log(`Delete meetup. Id: ${id}`);
      return result;
    } catch (e) {
      await this.logger.error(e);
      return e;
    }
  }

  public async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    try {
      await this.getUserRole(userId);
      await this.compareUserIdAndMeetupId(userId, id);
      await this.findMeetupById(id);
      const result = await this.repository.changeInfoInMeetup(userId, id, dto);
      this.logger.log(`Change meetup info. Id: ${id}`, result);
      return result;
    } catch (e) {
      await this.logger.error(e);
      return e;
    }
  }

  public async findMeetupById(id: number): Promise<MeetupResponse> {
    const meetup = await this.repository.getMeetupById(id);
    if (!meetup) {
      throw new BadRequestException('No meetup with this id');
    }
    return meetup;
  }

  public async getUserRole(userId: number): Promise<void> {
    const userRole = await this.repository.getUserRole(userId);
    if (userRole.role != 'ADMIN') {
      throw new HttpException('Access denied', 403);
    }
  }

  public async compareUserIdAndMeetupId(
    userId: number,
    id: number,
  ): Promise<void> {
    const meetupOwner = await this.repository.getMeetupOwnerId(id);
    if (userId != meetupOwner.meetupCreator) {
      throw new HttpException('Access denied!', 403);
    }
  }
}
