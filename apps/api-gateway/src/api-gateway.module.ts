import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/common/config/configService/configuration';
import { MeetupsMicroserviceModule } from './modules/meetups/meetups.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RmqModule } from '@app/common';
import { MEETUPS_SERVICE } from '../../meetups/src/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MeetupsMicroserviceModule,
    AuthModule,
    UsersModule,
  ],
})
export class ApiGatewayModule {}
