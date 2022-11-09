import { NestFactory } from '@nestjs/core'
import { EvaluationModule } from './evaluation/evaluation.module'
import { WsAdapter } from '@nestjs/platform-ws'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(EvaluationModule)
  app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(3000)
}

bootstrap()
