import { Controller, Get, Query } from '@nestjs/common'
import CSVLoader from 'src/utilities/csv-loader'
import { EvaluationService } from './evaluation.service'
import { Logger } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('evaluation')
  async requestEvaluation(@Query('url') urls: string): Promise<string> {
    return this.evaluationService.requestEvaluation(
      Array.isArray(urls) ? urls : [urls],
    )
  }
}
