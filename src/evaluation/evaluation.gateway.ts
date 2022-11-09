import { InjectQueue } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
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
  constructor(@InjectQueue('evaluation') private evaluationQueue: Queue) {}

  async handleConnection(@ConnectedSocket() client: WebSocket): Promise<void> {
    client.on('message', (buffer) =>
      this.handleMessage(buffer.toString(), client),
    )
  }

  handleMessage(uuid: string, client: WebSocket): void {
    const event = EvaluationGateway.GetEvaluationFinishedEventName(uuid)
    client.send(`subscribed on ${event}`)
    this.evaluationQueue.once(event, (args) => {
      client.send(JSON.stringify(args))
    })
  }
}
