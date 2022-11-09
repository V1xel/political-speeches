import CSVHelper from 'src/utilities/csv-helper'
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
        Speaker: data.Speaker.trim(),
        Topic: data.Topic.trim(),
        Date: new Date(data.Date.trim()),
        Words: parseInt(data.Words.trim()),
      }),
    )
  }

  private GetLeastWordySpeaker(): string {
    const speakers = Object.values(this.speakersDictionary)
    speakers.sort((a, b) => a.WordsTotal - b.WordsTotal)

    return speakers.at(0).Name
  }

  private GetMostSecuritySpeaker(): string {
    const speakers = Object.values(this.speakersDictionary)
    speakers.sort((a, b) => b.InternalSecurityCount - a.InternalSecurityCount)

    return speakers.at(0).Name
  }

  private GetMostSpeechesSpeaker(): string {
    const speakers = Object.values(this.speakersDictionary)
    speakers.sort((a, b) => b.SpeechTotal - a.SpeechTotal)

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
