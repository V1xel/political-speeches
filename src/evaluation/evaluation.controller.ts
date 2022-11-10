import { Controller, Get, Query } from '@nestjs/common'
import IEvaluationResult from 'src/interfaces/evaluation-result'
import { EvaluationService } from './evaluation.service'
import EvaluationQueryDTO from './validation/dto/evaluation-query'

@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('evaluation')
  async evaluation(
    @Query('url') { url }: EvaluationQueryDTO,
  ): Promise<IEvaluationResult> {
    return this.evaluationService.evaluate(Array.isArray(url) ? url : [url])
  }

  @Get('evaluation-async')
  async requestEvaluation(
    @Query('url') { url }: EvaluationQueryDTO,
  ): Promise<string> {
    return this.evaluationService.requestEvaluation(
      Array.isArray(url) ? url : [url],
    )
  }
}
