import { Controller, Get } from '@nestjs/common';
import { Public } from '../../../../auth/src/modules/auth/decorators';

@Controller('test')
export class TestsController {
  @Public()
  @Get()
  public async tes() {
    return 'asd';
  }
}
