import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'
import { EvaluationService } from './evaluation.service'

@Processor('speech')
export class EvaluationProcessor {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Process()
  async handle(job: Job<string>): Promise<null> {
    const results = []

    return null
  }
}
