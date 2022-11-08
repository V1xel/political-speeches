import { NestFactory } from '@nestjs/core'
import { SpeechModule } from './speech/speech.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(SpeechModule)
  await app.listen(3000)
}

bootstrap()
