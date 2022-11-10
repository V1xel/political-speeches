import { Controller, Get, Logger, Query, ValidationPipe } from '@nestjs/common'
import IEvaluationResult from 'src/interfaces/evaluation-result'
import { EvaluationService } from './evaluation.service'
import EvaluationQueryDTO from './validation/dto/evaluation-query'

@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('evaluation')
  async evaluation(
    @Query() { url, year }: EvaluationQueryDTO,
  ): Promise<IEvaluationResult> {
    return this.evaluationService.evaluate(
      Array.isArray(url) ? url : [url],
      year,
    )
  }

  @Get('evaluation-async')
  async requestEvaluation(
    @Query() { url, year }: EvaluationQueryDTO,
  ): Promise<string> {
    return this.evaluationService.requestEvaluation(
      Array.isArray(url) ? url : [url],
      year,
    )
  }
}
