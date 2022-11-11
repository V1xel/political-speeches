/* eslint-disable @typescript-eslint/no-explicit-any */
import { Speaker } from './speaker'
import { Speech } from './speech'

interface IPrivateSpeaker {
  _wordsTotal: number
  _internalSecurityCount: number
  _yearlySpeechesCount: { [id: number]: number }
  Name: string
  TryAddSpeech(speech: Speech)
  AddYearlySpeech(speech: Speech)
  IncrementInternalSecurityCount(speech: Speech)
  IncrementWordsTotal(speech: Speech)
  GetYearlySpeechesCount(year: number)
}

describe('Speaker', () => {
  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-inferrable-types
  const CreateSpeakerFactory = (): IPrivateSpeaker =>
    new Speaker({
      Name: 'Alexander Abel',
    }) as any as IPrivateSpeaker

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

  describe('Construction', () => {
    it('Speaker fields have to be initialized', () => {
      const speaker = CreateSpeakerFactory()

      expect(speaker._internalSecurityCount).toEqual(0)
      expect(speaker._wordsTotal).toEqual(0)
      expect(speaker._yearlySpeechesCount).toEqual({})
      expect(Object.keys(speaker._yearlySpeechesCount).length).toEqual(0)
    })

    it('Speaker have to throw an error after fail validation', () => {
      const speakerConstructor = (): Speaker =>
        new Speaker({
          Name: undefined,
        })

      expect(speakerConstructor).toThrow()
    })
  })

  describe('Functions', () => {
    it('IncrementWordsTotal have to increment total words count with the given speech amount of words', () => {
      const speaker = CreateSpeakerFactory()
      const speech = CreateSpeechFactory()

      const beforeValue = speaker._wordsTotal
      speaker.IncrementWordsTotal(speech)

      expect(speaker._wordsTotal).toEqual(beforeValue + speech.Words)
    })

    it('IncrementInternalSecurityCount have to increment total internal security count with the given amount of related speeches', () => {
      const speaker = CreateSpeakerFactory()
      const speech1 = CreateSpeechFactory(Speech.InternalSecurity)
      const speech2 = CreateSpeechFactory('Test Topic')
      const speech3 = CreateSpeechFactory('One More Test')

      const beforeValue = speaker._internalSecurityCount
      speaker.IncrementInternalSecurityCount(speech1)
      speaker.IncrementInternalSecurityCount(speech2)
      speaker.IncrementInternalSecurityCount(speech3)

      expect(speaker._internalSecurityCount).toEqual(beforeValue + 1)
    })

    it('AddYearlySpeech have to increment given year count', () => {
      const speaker = CreateSpeakerFactory()
      const speech1 = CreateSpeechFactory(
        Speech.InternalSecurity,
        new Date('2012-10-30'),
      )
      const speech2 = CreateSpeechFactory(
        Speech.InternalSecurity,
        new Date('2013-10-30'),
      )

      speaker.AddYearlySpeech(speech1)
      speaker.AddYearlySpeech(speech2)

      expect(speaker._yearlySpeechesCount[2012]).toEqual(1)
    })

    it('AddYearlySpeech have to increment given year count', () => {
      const speaker = CreateSpeakerFactory()
      const speech1 = CreateSpeechFactory(
        Speech.InternalSecurity,
        new Date('2012-10-30'),
      )
      const speech2 = CreateSpeechFactory(
        Speech.InternalSecurity,
        new Date('2013-10-30'),
      )

      speaker.AddYearlySpeech(speech1)
      speaker.AddYearlySpeech(speech2)

      expect(speaker._yearlySpeechesCount[2012]).toEqual(1)
    })

    it('GetYearlySpeechesCount have to provide value from the dicrionary', () => {
      const speaker = CreateSpeakerFactory()
      speaker._yearlySpeechesCount = {
        2012: 25,
      }

      expect(speaker.GetYearlySpeechesCount(2012)).toEqual(
        speaker._yearlySpeechesCount[2012],
      )
    })

    it('AddSpeech have to provide value from the dicrionary', () => {
      const speaker = CreateSpeakerFactory()
      const speech = CreateSpeechFactory()

      const AddYearlySpeech = jest.spyOn(
        Speaker.prototype as any,
        'AddYearlySpeech',
      )
      const IncrementInternalSecurityCount = jest.spyOn(
        Speaker.prototype as any,
        'IncrementInternalSecurityCount',
      )
      const IncrementWordsTotal = jest.spyOn(
        Speaker.prototype as any,
        'IncrementWordsTotal',
      )
      AddYearlySpeech.mockImplementation(() => null)
      IncrementInternalSecurityCount.mockImplementation(() => null)
      IncrementWordsTotal.mockImplementation(() => null)

      speaker.TryAddSpeech(speech)

      expect(AddYearlySpeech).toHaveBeenCalled()
      expect(IncrementInternalSecurityCount).toHaveBeenCalled()
      expect(IncrementWordsTotal).toHaveBeenCalled()
    })
  })
})
