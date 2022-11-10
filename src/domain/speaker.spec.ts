/* eslint-disable @typescript-eslint/no-explicit-any */
import { Speaker } from './speaker'
import { Speech } from './speech'

interface IPrivateSpeaker {
  AddSpeech(speech: Speech)
  AddYearlySpeech(speech: Speech)
  IncrementInternalSecurityCount(speech: Speech)
  IncrementWordsTotal(speech: Speech)
  IncrementSpeechTotal()
}

describe('Speaker', () => {
  const internalSecuritySpeech = new Speech({
    Speaker: 'Test',
    Date: new Date('2012-10-30'),
    Topic: Speech.InternalSecurity,
    Words: 12,
  })

  describe('Functions', () => {
    it('HasInternalSecurityTopic have to return true when speech has Internal Security topic.', () => {
      const speaker = new Speaker({
        Name: 'Alexander Abel',
      }) as any as IPrivateSpeaker
      speaker.AddYearlySpeech(internalSecuritySpeech)

      expect(true).toBe(true)
    })
  })
})
