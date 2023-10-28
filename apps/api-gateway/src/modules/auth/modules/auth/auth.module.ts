import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/common';
import { PrismaModule } from '@app/common/db/prisma.module';
import { AuthRepository } from '../../../../../../auth/src/modules/auth/auth.repository';
import { JwtTokensService } from '../../../../../../auth/src/modules/auth/jwt.tokens.service';
import { AuthMicroserviceModule } from '../../../../../../auth/src/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersGatewayModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/common/config/configService/configuration';
import { GoogleStrategy } from './strategies';
import { UploadsGatewayModule } from '../uploads/uploads.module';

@Module({
  imports: [
    RmqModule.register({ name: 'AUTH' }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
    AuthMicroserviceModule,
    JwtModule.register({}),
    UsersGatewayModule,
    UploadsGatewayModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AuthRepository,
    JwtTokensService,
    GoogleStrategy,
  ],
})
export class AuthGatewayModule {}
