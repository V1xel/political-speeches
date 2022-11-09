import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { EvaluationController } from './evaluation.controller'
import { EvaluationService } from './evaluation.service'
import { EvaluationGateway } from './evaluation.gateway'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    // BullModule.forRootAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     redis: {
    //       host: configService.getOrThrow('REDIS_HOST'),
    //       port: parseInt(configService.getOrThrow('REDIS_PORT')),
    //       password: configService.getOrThrow('REDIS_PASSWORD'),
    //     },
    //   }),
    // }),
  ],
  controllers: [],
  providers: [EvaluationService, EvaluationGateway],
})
export class EvaluationModule {}
