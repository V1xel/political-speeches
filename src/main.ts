import { NestFactory } from '@nestjs/core'
import { SpeechModule } from './evaluation/evaluation.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(SpeechModule)
  await app.listen(3000)
}

bootstrap()
