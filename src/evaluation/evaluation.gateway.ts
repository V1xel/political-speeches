import { InjectQueue } from '@nestjs/bull'
import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Queue } from 'bull'
import { Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EvaluationGateway {
  public static GetEvaluationFinishedEventName = (uuid: string): string =>
    `evaluation-finished-${uuid}`

  constructor(@InjectQueue('evaluation') private evaluationQueue: Queue) {}

  @SubscribeMessage('identity')
  async OnEvaluationFinished(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    this.evaluationQueue.addListener(
      EvaluationGateway.GetEvaluationFinishedEventName(data),
      client.send,
    )
  }
}
