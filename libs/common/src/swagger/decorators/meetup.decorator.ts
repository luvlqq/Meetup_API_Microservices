import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { MeetupResponse } from '../../../../../apps/meetups/src/modules/meetups/response';
import {
  BadRequestError,
  UnauthorizedError,
} from '@app/common/swagger/responses';

export function SwaggerMeetups() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      isArray: true,
      schema: {
        $ref: getSchemaPath(MeetupResponse),
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad Request',
      type: BadRequestError,
      schema: {
        $ref: getSchemaPath(BadRequestError),
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
      schema: {
        $ref: getSchemaPath(UnauthorizedError),
      },
    }),
  );
}
