import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { SpeechController } from './speech.controller'
import { SpeechService } from './speech.service'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: parseInt(configService.getOrThrow('REDIS_PORT')),
          password: configService.getOrThrow('REDIS_PASSWORD'),
        },
      }),
    }),
  ],
  controllers: [SpeechController],
  providers: [SpeechService],
})
export class SpeechModule {}
