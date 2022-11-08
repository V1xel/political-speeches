import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class SpeachService {
  constructor(@InjectQueue('audio') private speachQueue: Queue) {}

  async enqueue(urls: string[]): Promise<void> {
    this.speachQueue.add(urls)
  }
}
