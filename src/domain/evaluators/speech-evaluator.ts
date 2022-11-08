import ICSVSpeech from '../../interfaces/csv-speech'
import { Speaker } from '../speaker'
import { Speech } from '../speech'

interface IEvaluationResult {
  mostSpeeches: string | null
  mostSecurity: string | null
  leastWordy: string | null
}

export class SpeechEvaluator {
  private speakersDictionary: { [id: string]: Speaker } = {}

  public AddSpeakerData(data: ICSVSpeech): void {
    let speaker: Speaker = this.speakersDictionary[data.Speaker]
    if (!speaker) {
      speaker = new Speaker({ Name: data.Speaker })
      this.speakersDictionary[data.Speaker] = speaker
    }

    speaker.AddSpeech(
      new Speech({
        Speaker: data.Speaker,
        Topic: data.Topic,
        Date: new Date(data.Date),
        Words: parseInt(data.Words),
      }),
    )
  }

  private GetLeastWordySpeaker(): string {
    const speakers = Object.values(this.speakersDictionary)
    speakers.sort((a, b) => b.WordsTotal - a.WordsTotal)

    return speakers.at(0).Name
  }

  private GetMostSecuritySpeaker(): string {
    const speakers = Object.values(this.speakersDictionary)
    speakers.sort((a, b) => a.InternalSecurityCount - b.InternalSecurityCount)

    return speakers.at(0).Name
  }

  private GetMostSpeechesSpeaker(): string {
    const speakers = Object.values(this.speakersDictionary)
    speakers.sort((a, b) => a.SpeechTotal - b.SpeechTotal)

    return speakers.at(0).Name
  }

  public GetResult(): IEvaluationResult {
    return {
      leastWordy: this.GetLeastWordySpeaker(),
      mostSecurity: this.GetMostSecuritySpeaker(),
      mostSpeeches: this.GetMostSpeechesSpeaker(),
    }
  }
}
