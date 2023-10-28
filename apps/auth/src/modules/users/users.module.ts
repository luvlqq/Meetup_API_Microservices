import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { RmqModule } from '@app/common';
import { PrismaModule } from '@app/common/db/prisma.module';
import { AtGuard } from '../auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RmqModule,
    PrismaModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  exports: [UsersMicroserviceModule],
})
export class UsersMicroserviceModule {}
