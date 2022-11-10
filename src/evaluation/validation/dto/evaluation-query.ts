import { IsString, IsNotEmpty, IsUrl } from 'class-validator'

export default class EvaluationQueryDTO {
  @IsString({
    message: 'evaluation-validation: Only string urls are allowed',
    each: true,
  })
  @IsNotEmpty({
    message: 'evaluation-validation: Only non-empty urls are allowed',
    each: true,
  })
  @IsUrl({
    message: 'evaluation-validation: Only valid urls are allowed',
    each: true,
  })
  url: string | string[]
}
