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

  describe('Construction', () => {
    describe('CheckWordsIsValidOrThrow', () => {
      it('have to throw an error when the date is invalid', () => {
        const speechConstructor = (): Speech =>
          new Speech({
            Date: new Date('aweg'),
            Speaker: 'Test',
            Topic: 'Test',
            Words: 124,
          })

        expect(speechConstructor).toThrow()
      })

      it('have to throw an error when words < Speech.MinialAlowedWordsCount', () => {
        const speechConstructor = (): Speech =>
          new Speech({
            Date: new Date('2012-10-10'),
            Speaker: 'Test',
            Topic: 'Test',
            Words: -124,
          })

        expect(speechConstructor).toThrow()
      })

      it('have to throw an error when words is not a number', () => {
        const speechConstructor = (): Speech =>
          new Speech({
            Date: new Date('2012-10-10'),
            Speaker: 'Test',
            Topic: 'Test',
            Words: parseInt('aweg'),
          })

        expect(speechConstructor).toThrow()
      })

      it('have to throw an error when topic or speaker is undefined', () => {
        const speechConstructor = (): Speech =>
          new Speech({
            Date: new Date('2012-10-10'),
            Speaker: undefined,
            Topic: 'Test',
            Words: parseInt('aweg'),
          })

        const speechConstructor2 = (): Speech =>
          new Speech({
            Date: new Date('2012-10-10'),
            Speaker: 'Test',
            Topic: undefined,
            Words: parseInt('aweg'),
          })

        expect(speechConstructor).toThrow()
        expect(speechConstructor2).toThrow()
      })
    })
  })

  describe('Functions', () => {
    describe('HasInternalSecurityTopic', () => {
      it('have to return true when speech has Internal Security topic.', () => {
        expect(internalSecuritySpeech.HasInternalSecurityTopic()).toBe(true)
      })

      it('have to return false when speech does not have Internal Security topic.', () => {
        expect(remoteEducationSpeech.HasInternalSecurityTopic()).toBe(false)
      })
    })

    describe('GetYear', () => {
      it('GetYear have provide valid integer for test data date', () => {
        expect(remoteEducationSpeech.GetYear()).toBe(2012)
      })
    })
  })
})
