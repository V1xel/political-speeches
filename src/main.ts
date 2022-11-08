import { NestFactory } from '@nestjs/core'
import { EvaluationModule } from './evaluation/evaluation.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(EvaluationModule)
  await app.listen(3000)
}

bootstrap()
