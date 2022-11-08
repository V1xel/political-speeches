import { Injectable } from '@nestjs/common'
import { SpeechEvaluator } from 'src/domain/evaluators/speech-evaluator'
import IEvaluationResult from 'src/interfaces/evaluation-result'
import CSVLoader from 'src/utilities/csv-loader'
import CSVParser from 'src/utilities/csv-parser'

@Injectable()
export class EvaluationService {
  async evaluate(urls: string[]): Promise<IEvaluationResult> {
    const filePathes = await CSVLoader.load(urls)

    const evaluator = new SpeechEvaluator()
    for (const filePath of filePathes) {
      await CSVParser.parse(filePath, evaluator.AddSpeakerData)
    }

    return evaluator.GetResult()
  }
}
