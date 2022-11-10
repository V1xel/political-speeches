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
  })
})
