import { Processor, Process, InjectQueue } from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { EvaluationService } from './evaluation.service'
import IQueueElement from 'src/interfaces/queue-element'
import { EvaluationGateway } from './evaluation.gateway'

@Processor('evaluation')
export class EvaluationProcessor {
  constructor(
    private readonly evaluationService: EvaluationService,
    @InjectQueue('evaluation') private evaluationQueue: Queue,
  ) {}

  @Process()
  async handle(job: Job<IQueueElement>): Promise<void> {
    const { uuid, urls, year } = job.data
    const result = await this.evaluationService.evaluate(urls, year)

    const haveListeners = this.evaluationQueue.emit(
      EvaluationGateway.GetEvaluationFinishedEventName(uuid),
      result,
    )

    if (!haveListeners) {
      const finishedBeforeSubscription =
        EvaluationGateway.GetAwaitingSubscriptionEventName(uuid)
      this.evaluationQueue.once(finishedBeforeSubscription, () =>
        this.evaluationQueue.emit(
          EvaluationGateway.GetEvaluationFinishedEventName(uuid),
          result,
        ),
      )
    }
  }
}
