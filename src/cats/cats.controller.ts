import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  
  @Get()
  findAll(): string {
    return 'this controller returns all cats'
  }
}
