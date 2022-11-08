import { Controller, Post, Query } from '@nestjs/common'
import { SpeachService } from './speach.service'

@Controller()
export class SpeachController {
  constructor(private readonly speachService: SpeachService) {}

  @Post('post-url')
  postUrl(@Query('url') url: string): void {
    //validate
    this.speachService.enqueue([url])
  }
}
