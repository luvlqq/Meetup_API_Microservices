import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RmqModule } from '@app/common';
import { PrismaModule } from '@app/common/db/prisma.module';

@Module({
  imports: [PrismaModule, RmqModule.register({ name: 'AUTH' })],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersGatewayModule],
})
export class UsersGatewayModule {}
