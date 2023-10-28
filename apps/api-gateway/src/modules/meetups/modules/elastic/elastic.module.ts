import { Module } from '@nestjs/common';
import { ElasticGatewayController } from './elastic.controller';
import { ElasticGatewayService } from './elastic.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule.register({ name: 'MEETUPS' })],
  controllers: [ElasticGatewayController],
  providers: [ElasticGatewayService],
})
export class ElasticGatewayModule {}
