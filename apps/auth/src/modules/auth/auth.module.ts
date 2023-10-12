import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { JwtTokensService } from './jwt.tokens.service';
import { AtStrategy, RtStrategy } from './strategies';
import { PrismaModule } from '@app/common/db/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/common/config/configService/configuration';
import { RmqModule } from '@app/common';
import { UsersMicroserviceModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RmqModule,
    UsersMicroserviceModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtTokensService,
    RtStrategy,
    AtStrategy,
    Logger,
  ],
  exports: [AuthRepository, JwtTokensService],
})
export class AuthMicroserviceModule {}
