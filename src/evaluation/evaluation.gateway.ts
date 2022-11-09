import { InjectQueue } from '@nestjs/bull'
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Queue } from 'bull'
import { WebSocket } from 'ws'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EvaluationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  // constructor(@InjectQueue('evaluation') private evaluationQueue: Queue) {}

  async handleConnection(@ConnectedSocket() client: WebSocket): Promise<void> {
    client.on('message', (buffer) =>
      this.handleMessage(JSON.parse(buffer.toString())),
    )
  }

  handleMessage({ event, uuid }: { event: string; uuid: string }): void {
    
  }

  async handleDisconnect(): Promise<void> {}
}
