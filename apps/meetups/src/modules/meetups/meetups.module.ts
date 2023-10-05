import { Logger, Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './meetups.repository';
import { PrismaModule } from '@app/common/db/prisma.module';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from '../../../../auth/src/modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { AuthMicroserviceModule } from '../../../../auth/src/modules/auth/auth.module';
import { UsersModule } from '../../../../auth/src/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    RmqModule,
    AuthMicroserviceModule,
    UsersModule,
  ],
  controllers: [MeetupsController],
  providers: [
    MeetupsService,
    MeetupsRepository,
    Logger,
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class MeetupsModule {}
