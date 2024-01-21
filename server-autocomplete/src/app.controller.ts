import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('autocomplete')
  getAutocomplete(@Query() queryParams:any): string[] {
    const { query, limit = 10, page = 1 } = queryParams ;
   
    return this.appService.getAutocomplete(query,limit,page);
  }
}
