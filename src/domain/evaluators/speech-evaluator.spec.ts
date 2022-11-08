import { Speech } from './speech'

describe('Speach', () => {
  const speech = new Speech({
    Speaker: 'Test',
    Date: new Date(),
    Topic: Speech.InternalSecurity,
    Words: 12,
  })

  describe('root', () => {
    it('HasInternalSecurityTopic have to return true when speech has Internal Security topic.', () => {
      expect(speech.HasInternalSecurityTopic()).toBe(true)
    })
  })
})
