import { Processor, Process, InjectQueue } from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { EvaluationService } from './evaluation.service'
import IQueueElement from 'src/interfaces/queue-element'
import { EvaluationGateway } from './evaluation.gateway'

@Processor('speech')
export class EvaluationProcessor {
  constructor(
    private readonly evaluationService: EvaluationService, // @InjectQueue('evaluation') private evaluationQueue: Queue,
  ) {}

  @Process()
  async handle(job: Job<IQueueElement>): Promise<void> {
    const { uuid, urls } = job.data
    const result = await this.evaluationService.evaluate(urls)
    // this.evaluationQueue.emit(
    //  EvaluationGateway.GetEvaluationFinishedEventName(uuid),
    //   result,
    // )
  }
}
