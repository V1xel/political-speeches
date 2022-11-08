import { Controller, Get, Query } from '@nestjs/common'
import { EvaluationService } from './evaluation.service'

@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('evaluation')
  async requestEvaluation(@Query('url') urls: string[]): Promise<string> {
    return this.evaluationService.requestEvaluation(urls)
  }
}
