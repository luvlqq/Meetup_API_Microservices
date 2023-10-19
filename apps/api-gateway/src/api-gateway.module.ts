import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/common/config/configService/configuration';
import { MeetupsGatewayModule } from './modules/meetups/modules/meetups/meetups.module';
import { AuthGatewayModule } from './modules/auth/modules/auth/auth.module';
import { UsersGatewayModule } from './modules/auth/modules/users/users.module';
import { AtGuard } from '../../auth/src/modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { ReportsGatewayModule } from './modules/meetups/modules/reports/reports.module';
import { UploadsGatewayModule } from './modules/auth/modules/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MeetupsGatewayModule,
    AuthGatewayModule,
    UploadsGatewayModule,
    UsersGatewayModule,
    ReportsGatewayModule,
  ],
  providers: [
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class ApiGatewayModule {}
