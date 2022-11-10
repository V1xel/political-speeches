import { InjectQueue } from '@nestjs/bull'
import {
  WebSocketGateway,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Queue } from 'bull'
import { WebSocket } from 'ws'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EvaluationGateway implements OnGatewayConnection {
  public static GetEvaluationFinishedEventName = (uuid: string): string =>
    `evaluation-finished-${uuid}`
  public static GetAwaitingSubscriptionEventName = (uuid: string): string =>
    `evaluation-awaiting-${uuid}`

  constructor(@InjectQueue('evaluation') private evaluationQueue: Queue) {}

  async handleConnection(@ConnectedSocket() client: WebSocket): Promise<void> {
    client.on('message', (buffer) =>
      this.handleMessage(buffer.toString(), client),
    )
  }

  handleMessage(uuid: string, client: WebSocket): void {
    const finishedEvent = EvaluationGateway.GetEvaluationFinishedEventName(uuid)
    const finishedBeforeSubscription =
      EvaluationGateway.GetAwaitingSubscriptionEventName(uuid)

    this.evaluationQueue.once(finishedEvent, (args) => {
      client.send(JSON.stringify(args))
    })
    client.send(`subscribed on ${finishedEvent}`)

    if (this.evaluationQueue.listenerCount(finishedBeforeSubscription) > 0) {
      this.evaluationQueue.emit(finishedBeforeSubscription)
    }
  }
}
