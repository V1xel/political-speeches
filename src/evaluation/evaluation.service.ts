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
import { Logger } from '@nestjs/common'

@Injectable()
export class EvaluationService {
  constructor(@InjectQueue('evaluation') private evaluationQueue: Queue) {}

  async requestEvaluation(urls: string[]): Promise<string> {
    Logger.log('requesting evaluation')
    const queueElement: IQueueElement = { uuid: uuidv4(), urls }
    this.evaluationQueue.add(queueElement)

    return queueElement.uuid
  }

  async evaluate(urls: string[]): Promise<IEvaluationResult> {
    Logger.warn('evaluation in progress')
    const filePathes = await CSVLoader.load(urls)

    const evaluator = new SpeechEvaluator()
    for (const filePath of filePathes) {
      await CSVParser.parse<ICSVSpeech>(filePath, (data) =>
        evaluator.AddSpeakerData(data),
      )
    }

    Logger.warn('evaluation awaiting')
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 10000)
    })

    // await CSVLoader.clear()

    const result = evaluator.GetResult()
    Logger.warn('evaluation complete')
    Logger.warn(result)

    return result
  }
}
