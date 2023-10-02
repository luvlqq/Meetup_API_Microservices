import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateMeetupDto, UpdateMeetupDto } from './dto';
import { GetCurrentUserId } from '../../../../auth/src/modules/auth/decorators';
import { MeetupResponse } from './response';
import { AccessDenied } from '@app/common/swagger/responses';
import { SwaggerMeetups } from '@app/common/swagger/decorators/meetup.decorator';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Get()
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all meetups' })
  @SwaggerMeetups()
  public async getAllMeetups() {
    return this.meetupsService.getAllMeetups();
  }

  /*
   * Собственно вот ошибка:
   * [Nest] 229  - 10/02/2023, 7:58:26 AM    WARN [Server] An unsupported event was received. It has been acknowledged, so it will not be re-delivered. Pattern: testss
   * Все пробовал на этом тестовом контроллере
   * */

  @Get('test')
  public async tests() {
    return await this.meetupsService.testss();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiExtraModels(MeetupResponse)
  @ApiOperation({ summary: 'Get meetup by id' })
  @SwaggerMeetups()
  public async getMeetupById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getMeetupById(id);
  }

  @Post('createMeetup')
  @ApiBearerAuth()
  @ApiExtraModels(MeetupResponse)
  @ApiOperation({ summary: 'Create a meetup' })
  @SwaggerMeetups()
  @ApiResponse({
    status: 403,
    description: 'Access denied',
    schema: {
      $ref: getSchemaPath(AccessDenied),
    },
  })
  public async createAMeetup(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.createAMeetup(userId, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change meetup parameters by id' })
  @SwaggerMeetups()
  @ApiResponse({
    status: 403,
    description: 'Access denied',
    type: AccessDenied,
    schema: {
      $ref: getSchemaPath(AccessDenied),
    },
  })
  public async changeInfoInMeetup(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.changeInfoInMeetup(userId, id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete meetup by id' })
  @SwaggerMeetups()
  @ApiResponse({
    status: 403,
    description: 'Access denied',
    schema: {
      $ref: getSchemaPath(AccessDenied),
    },
  })
  public async deleteMeetupById(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.deleteMeetupById(userId, id);
  }
}
