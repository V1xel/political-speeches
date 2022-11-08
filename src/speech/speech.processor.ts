import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'

@Processor('speech')
export class SpeechProcessor {
  @Process()
  async handle(job: Job<string>): Promise<null> {
    let progress = 0
    for (let i = 0; i < 100; i++) {
      //await doSomething(job.data)
      progress += 1
      await job.progress(progress)
    }
    return null
  }
}
