import { Controller, Get, Post, HttpCode, Header, Redirect, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Simple get with header
   */
  @Get()
  @Header('Cache-Control', 'none')
  @Redirect('http://localhost:3000/swagger')
  getHello(): void {
    return
  }

  /**
   * Redirect
   */
  @Get('redirect')
  @Redirect('http://localhost:3000/cats')
  getRedirected() {
    return
  }

  /**
   * How to get value from the url
   * @param value
   */
  @Get(':value')
  getNumber(@Param('value') value: string): string {
    return `You sent ${value}`
  }

  /**
   * Wait before sending an answer
   * @param waitTime time in ms
   */
  @Get('wait/:ms')
  getAnswerLater(@Param('ms') waitTime: number): Observable<string> {
    return of(`I waited ${waitTime}ms before answering !`)
      .pipe(
        delay(waitTime)
      )
  }

  /**
   * Change http code of the response
   */
  @Post('tea')
  @HttpCode(418)
  post(): string {
    return 'I\'m not a Server, I\'m a teapot !'
  }
}
