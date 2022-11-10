/* eslint-disable @typescript-eslint/no-explicit-any */
import ICSVSpeech from 'src/interfaces/csv-speech'
import IEvaluationResult from 'src/interfaces/evaluation-result'
import { Speaker } from '../speaker'
import { SpeechEvaluator } from './speech-evaluator'

interface IPrivateSpeechEvaluator {
  _speakersDictionary: { [id: string]: Speaker }
  GetLeastWordySpeaker(): string
  GetMostSecuritySpeaker(): string
  GetMostYearlySpeechesSpeaker(): string
  AddSpeakerData(data: ICSVSpeech)
  GetResult(): IEvaluationResult
}

interface IPrivateSpeaker {
  _wordsTotal: number
  _internalSecurityCount: number
  _yearlySpeechesCount: { [id: number]: number }
}

describe('SpeechEvaluator', () => {
  const CreateSpeechEvaluatorFactory = (year = 2013): IPrivateSpeechEvaluator =>
    new SpeechEvaluator({
      YearForSpeechesCount: year,
    }) as any as IPrivateSpeechEvaluator

  const CreateSpeakerFactory = (name: string): IPrivateSpeaker =>
    new Speaker({
      Name: name,
    }) as any as IPrivateSpeaker

  describe('Functions', () => {
    describe('GetLeastWordySpeaker', () => {
      it('have to return speaker with the least words.', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        const speaker = CreateSpeakerFactory('Alexander Abel')
        speaker._wordsTotal = 20

        const speaker2 = CreateSpeakerFactory('Volodymyr Abel')
        speaker2._wordsTotal = 2000

        evaluator._speakersDictionary = {
          'Alexander Abel': speaker as any as Speaker,
          'Volodymyr Abel': speaker2 as any as Speaker,
        }

        expect(evaluator.GetLeastWordySpeaker()).toBe('Alexander Abel')
      })

      it('have to return null with empty list of speakers.', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        expect(evaluator.GetLeastWordySpeaker()).toBe(null)
      })
    })

    describe('GetMostSecuritySpeaker', () => {
      it('have to return speaker with the most speeches with security topic.', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        const speaker = CreateSpeakerFactory('Alexander Abel')
        speaker._internalSecurityCount = 20000

        const speaker2 = CreateSpeakerFactory('Volodymyr Abel')
        speaker2._internalSecurityCount = 25

        evaluator._speakersDictionary = {
          'Alexander Abel': speaker as any as Speaker,
          'Volodymyr Abel': speaker2 as any as Speaker,
        }

        expect(evaluator.GetMostSecuritySpeaker()).toBe('Alexander Abel')
      })

      it('have to return null with empty list of speakers.', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        expect(evaluator.GetMostSecuritySpeaker()).toBe(null)
      })
    })

    describe('GetMostYearlySpeechesSpeaker', () => {
      it('have to return speaker with the most speeches in specified year.', () => {
        const evaluator = CreateSpeechEvaluatorFactory(2025)
        const speaker = CreateSpeakerFactory('Alexander Abel')
        speaker._internalSecurityCount = 20000
        speaker._yearlySpeechesCount = {
          2012: 2500,
          2025: 2100,
        }

        const speaker2 = CreateSpeakerFactory('Volodymyr Abel')
        speaker2._internalSecurityCount = 25
        speaker2._yearlySpeechesCount = {
          2012: 5,
          2025: 500,
        }

        const speaker3 = CreateSpeakerFactory('Andrey Abel')
        speaker3._internalSecurityCount = 25
        speaker3._yearlySpeechesCount = {
          2012: 5124,
        }

        evaluator._speakersDictionary = {
          'Alexander Abel': speaker as any as Speaker,
          'Volodymyr Abel': speaker2 as any as Speaker,
          'Andrey Abel': speaker3 as any as Speaker,
        }

        expect(evaluator.GetMostYearlySpeechesSpeaker()).toBe('Alexander Abel')
      })

      it('have to return null with empty list of speakers.', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        expect(evaluator.GetMostYearlySpeechesSpeaker()).toBe(null)
      })
    })

    describe('GetResult', () => {
      it('uses private logic to provide the result.', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        const GetLeastWordySpeaker = jest.spyOn(
          SpeechEvaluator.prototype as any,
          'GetLeastWordySpeaker',
        )
        const GetMostSecuritySpeaker = jest.spyOn(
          SpeechEvaluator.prototype as any,
          'GetMostSecuritySpeaker',
        )
        const GetMostYearlySpeechesSpeaker = jest.spyOn(
          SpeechEvaluator.prototype as any,
          'GetMostYearlySpeechesSpeaker',
        )

        GetLeastWordySpeaker.mockImplementation(() => null)
        GetMostSecuritySpeaker.mockImplementation(() => null)
        GetMostYearlySpeechesSpeaker.mockImplementation(() => null)

        evaluator.GetResult()

        expect(GetLeastWordySpeaker).toHaveBeenCalled()
        expect(GetMostSecuritySpeaker).toHaveBeenCalled()
        expect(GetMostYearlySpeechesSpeaker).toHaveBeenCalled()
      })
    })

    describe('AddSpeakerData', () => {
      it('have to add new speakers to the dictionary', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        const speech: ICSVSpeech = {
          Speaker: 'Alexander Abel',
          Topic: 'Internal Security',
          Date: '2012-10-30',
          Words: '100',
        }

        const beforeCount = Object.keys(evaluator._speakersDictionary).length
        evaluator.AddSpeakerData(speech)
        const afterCount = Object.keys(evaluator._speakersDictionary).length

        expect(afterCount).toBe(beforeCount + 1)
      })

      it('have to reuse existing in the dictionary speakers', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        const speech: ICSVSpeech = {
          Speaker: 'Alexander Abel',
          Topic: 'Internal Security',
          Date: '2012-10-30',
          Words: '100',
        }

        const beforeCount = Object.keys(evaluator._speakersDictionary).length
        evaluator.AddSpeakerData(speech)
        evaluator.AddSpeakerData(speech)
        const afterCount = Object.keys(evaluator._speakersDictionary).length

        expect(afterCount).toBe(beforeCount + 1)
      })

      it('have to add speach to speakers', () => {
        const evaluator = CreateSpeechEvaluatorFactory()
        const speaker = CreateSpeakerFactory('Alexander Abel')
        evaluator._speakersDictionary = {
          'Alexander Abel': speaker as any as Speaker,
        }

        const AddSpeech = jest.spyOn(Speaker.prototype as any, 'AddSpeech')
        AddSpeech.mockImplementation(() => console.log('called'))

        const speech: ICSVSpeech = {
          Speaker: 'Alexander Abel',
          Topic: 'Internal Security',
          Date: '2012-10-30',
          Words: '100',
        }

        evaluator.AddSpeakerData(speech)

        expect(AddSpeech).toHaveBeenCalled()
      })
    })
  })
})
