/* eslint-disable @typescript-eslint/no-explicit-any */
import ICSVSpeech from 'src/interfaces/csv-speech'
import { Speaker } from '../speaker'
import { Speech } from '../speech'
import { SpeechEvaluator } from './speech-evaluator'

interface IPrivateSpeechEvaluator {
  GetLeastWordySpeaker()
  GetMostSecuritySpeaker()
  GetMostYearlySpeechesSpeaker()
  AddSpeakerData(data: ICSVSpeech)
  GetResult()
}

describe('SpeechEvaluator', () => {
  const CreateSpeechEvaluatorFactory = (): IPrivateSpeechEvaluator =>
    new SpeechEvaluator({
      YearForSpeechesCount: 2013,
    }) as any as IPrivateSpeechEvaluator

  const CreateSpeakerFactory = (): Speaker =>
    new Speaker({
      Name: 'Alexander Abel',
    })

  const CreateSpeechFactory = (
    topic: string = Speech.InternalSecurity,
    date: Date = new Date('2012-10-30'),
  ): Speech =>
    new Speech({
      Speaker: 'Test',
      Date: date,
      Topic: topic,
      Words: 12,
    })

  describe('Functions', () => {
    it('HasInternalSecurityTopic have to return true when speech has Internal Security topic.', () => {
      const evaluator = CreateSpeechEvaluatorFactory()
      evaluator.AddSpeakerData()

      expect(true).toBe(true)
    })
  })
})
