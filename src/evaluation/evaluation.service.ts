import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { SpeechEvaluator } from 'src/domain/evaluators/speech-evaluator'
import { v4 as uuidv4 } from 'uuid'
import IQueueElement from 'src/interfaces/queue-element'
import IEvaluationResult from 'src/interfaces/evaluation-result'
import CSVLoader from 'src/utilities/csv-loader'
import CSVParser from 'src/utilities/csv-parser'
import ICSVSpeech from 'src/interfaces/csv-speech'

@Injectable()
export class EvaluationService {
  constructor(@InjectQueue('evaluation') private evaluationQueue: Queue) {}

  async requestEvaluation(urls: string[], year: number): Promise<string> {
    const queueElement: IQueueElement = { uuid: uuidv4(), urls, year }
    this.evaluationQueue.add(queueElement)

    return queueElement.uuid
  }

  async evaluate(urls: string[], year: number): Promise<IEvaluationResult> {
    const filePathes = await CSVLoader.load(urls)

    const evaluator = new SpeechEvaluator({ YearForSpeechesCount: year })
    for (const filePath of filePathes) {
      await CSVParser.parse<ICSVSpeech>(filePath, (data) => {
        if (evaluator.CheckDataIsValid(data)) {
          evaluator.AddSpeakerData(data)
        }
      })
    }

    await CSVLoader.clear()

    return evaluator.GetResult()
  }
}
