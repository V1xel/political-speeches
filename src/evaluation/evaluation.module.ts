import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { EvaluationController } from './evaluation.controller'
import { EvaluationService } from './evaluation.service'
import { EvaluationGateway } from './evaluation.gateway'
import { EvaluationProcessor } from './evaluation.processor'

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'evaluation',
    }),
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationGateway, EvaluationProcessor],
})
export class EvaluationModule {}
