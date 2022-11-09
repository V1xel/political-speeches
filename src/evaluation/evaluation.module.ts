import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { EvaluationController } from './evaluation.controller'
import { EvaluationService } from './evaluation.service'
import { EvaluationGateway } from './evaluation.gateway'
import { EvaluationProcessor } from './evaluation.processor'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    BullModule.forRootAsync({
      //imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host:
            process.env.REDIS_HOST ?? configService.getOrThrow('REDIS_HOST'),
          port:
            process.env.REDIS_PORT ??
            parseInt(configService.getOrThrow('REDIS_PORT')),
          password:
            process.env.REDIS_PASSWORD ??
            configService.getOrThrow('REDIS_PASSWORD'),
        },
      }),
      //inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'evaluation',
    }),
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationGateway, EvaluationProcessor],
})
export class EvaluationModule {}
