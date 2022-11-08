import { Controller, Get, Query } from '@nestjs/common'
import IEvaluationResult from 'src/interfaces/evaluation-result'
import { EvaluationService } from './evaluation.service'

@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('evaluation')
  async evaluate(@Query('url') url: string): Promise<IEvaluationResult> {
    return this.evaluationService.evaluate(['example.csv'])
  }
}
