import { Controller, Post, Query } from '@nestjs/common'
import { SpeechService } from './speech.service'

@Controller()
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post('post-url')
  postUrl(@Query('url') url: string): void {
    //validate
    this.speechService.enqueue([url])
  }
}
