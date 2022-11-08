import { SpeechEvaluator } from './speech-evaluator'

describe('Speach', () => {
  const speech = new SpeechEvaluator()

  describe('root', () => {
    it('HasInternalSecurityTopic have to return true when speech has Internal Security topic.', () => {
      expect(speech).toBe(true)
    })
  })
})
