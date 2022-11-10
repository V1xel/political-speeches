import { Transform } from 'class-transformer'
import { IsOptional, IsNumber } from 'class-validator'
import { IsUrlValid } from '../validators/valid-url'

export default class EvaluationQueryDTO {
  @IsUrlValid()
  url: string | string[]

  @IsOptional()
  @IsNumber()
  @Transform((value) => parseInt(value.value))
  year = 2013
}
