import { IsOptional, IsNumber } from 'class-validator'
import { IsUrlValid } from '../validators/valid-url'

export default class EvaluationQueryDTO {
  @IsUrlValid()
  url: string | string[]

  @IsOptional()
  @IsNumber()
  year = 2013
}
