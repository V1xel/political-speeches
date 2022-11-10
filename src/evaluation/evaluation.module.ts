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
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: parseInt(configService.getOrThrow('REDIS_PORT')),
          password: configService.getOrThrow('REDIS_PASSWORD'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'evaluation',
    }),
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService, EvaluationGateway, EvaluationProcessor],
})
export class EvaluationModule {}
