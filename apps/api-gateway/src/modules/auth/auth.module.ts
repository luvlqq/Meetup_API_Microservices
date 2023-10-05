import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/common';
import { PrismaModule } from '@app/common/db/prisma.module';
import { AuthRepository } from '../../../../auth/src/modules/auth/auth.repository';
import { JwtTokensService } from '../../../../auth/src/modules/auth/jwt.tokens.service';
import { AuthMicroserviceModule } from '../../../../auth/src/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RmqModule.register({ name: 'AUTH' }),
    PrismaModule,
    AuthMicroserviceModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtTokensService],
})
export class AuthModule {}
