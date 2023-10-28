import { Module } from '@nestjs/common';
import { UploadsGatewayController } from './uploads.controller';
import { UploadsGatewayService } from './uploads.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule.register({ name: 'AUTH' })],
  controllers: [UploadsGatewayController],
  providers: [UploadsGatewayService],
})
export class UploadsGatewayModule {}
