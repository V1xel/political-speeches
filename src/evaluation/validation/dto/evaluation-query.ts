import { IsUrlValid } from '../validators/valid-url'

export default class EvaluationQueryDTO {
  @IsUrlValid()
  url: string | string[]
}
