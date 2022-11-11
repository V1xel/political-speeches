/* eslint-disable @typescript-eslint/no-explicit-any */
import { Speech } from './speech'

describe('Speech', () => {
  const internalSecuritySpeech = new Speech({
    Speaker: 'Test',
    Date: new Date('2012-10-30'),
    Topic: Speech.InternalSecurity,
    Words: 12,
  })

  const remoteEducationSpeech = new Speech({
    Speaker: 'Test',
    Date: new Date('2012-10-30'),
    Topic: 'Remote Education',
    Words: 12,
  })

  describe('Functions', () => {
    it('HasInternalSecurityTopic have to return true when speech has Internal Security topic.', () => {
      expect(internalSecuritySpeech.HasInternalSecurityTopic()).toBe(true)
    })

    it('HasInternalSecurityTopic have to return false when speech does not have Internal Security topic.', () => {
      expect(remoteEducationSpeech.HasInternalSecurityTopic()).toBe(false)
    })

    it('GetYear have provide valid integer for test data date', () => {
      expect(remoteEducationSpeech.GetYear()).toBe(2012)
    })

    it('CheckSpeechIsValid set speech IsValid to false when object is invalid', () => {
      const invalidSpeaker = new Speech({
        Speaker: undefined,
        Date: new Date('2012-10-30'),
        Topic: 'Remote Education',
        Words: 12,
      })
      const invalidDate = new Speech({
        Speaker: 'Test Speaker',
        Date: new Date('waeg'),
        Topic: 'Remote Education',
        Words: 12,
      })
      const invalidTopic = new Speech({
        Speaker: 'Test Speaker',
        Date: new Date('2012-10-30'),
        Topic: undefined,
        Words: 12,
      })
      const invalidWords = new Speech({
        Speaker: 'Test Speaker',
        Date: new Date('2012-10-30'),
        Topic: 'Remote Education',
        Words: 'aweg' as any,
      })

      expect(
        invalidSpeaker.IsValid() &&
          invalidDate.IsValid() &&
          invalidTopic.IsValid() &&
          invalidWords.IsValid(),
      ).toBeFalsy()
    })
  })
})
