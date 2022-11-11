import { NestFactory } from '@nestjs/core'
import { EvaluationModule } from './evaluation/evaluation.module'
import { WsAdapter } from '@nestjs/platform-ws'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(EvaluationModule)
  app.useWebSocketAdapter(new WsAdapter(app))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  await app.listen(process.env.APP_PORT)
}

bootstrap()
