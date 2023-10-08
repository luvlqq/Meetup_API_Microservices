import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { GetCurrentUserId } from '../../../../auth/src/modules/auth/decorators';
import { MeetupResponse } from './response';
import { AccessDenied } from '@app/common/swagger/responses';
import { SwaggerMeetups } from '@app/common/swagger/decorators/meetup.decorator';
import { CordsDto } from './dto/cords.dto';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all meetups' })
  @SwaggerMeetups()
  public async getAllMeetups(
    @Body() dto: GetMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getAllMeetups(dto);
  }

  @Get('cords')
  public async getMeetupsByCords(
    @Query('long') long: number,
    @Query('lat') lat: number,
  ) {
    Logger.log(`Gateway controller: ${long}, ${lat}`);
    const parsedLong = parseFloat(String(long));
    const parsedLat = parseFloat(String(lat));
    return this.meetupsService.getMeetupsByCords(parsedLong, parsedLat);
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
