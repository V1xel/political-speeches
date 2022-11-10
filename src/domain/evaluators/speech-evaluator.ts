import ICSVSpeech from '../../interfaces/csv-speech'
import { Speaker } from '../speaker'
import { Speech } from '../speech'

interface IEvaluationResult {
  mostYearlySpeeches: string | null
  mostSecurity: string | null
  leastWordy: string | null
}

export interface ISpeechEvaluatorArgs {
  YearForSpeechesCount: number
}

export class SpeechEvaluator {
  constructor(private _args: ISpeechEvaluatorArgs) {}

  private _speakersDictionary: { [id: string]: Speaker } = {}

  public AddSpeakerData(data: ICSVSpeech): void {
    let speaker: Speaker = this._speakersDictionary[data.Speaker]

    if (!speaker) {
      speaker = new Speaker({ Name: data.Speaker })
      this._speakersDictionary[data.Speaker] = speaker
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
    const speakers = Object.values(this._speakersDictionary)
    if (speakers.length === 0) {
      return null
    }

    const sorted = speakers.sort((a, b) => a.WordsTotal - b.WordsTotal)
    return sorted.at(0).Name
  }

  private GetMostSecuritySpeaker(): string {
    const speakers = Object.values(this._speakersDictionary)
    if (speakers.length === 0) {
      return null
    }

    const sorted = speakers.sort(
      (a, b) => b.InternalSecurityCount - a.InternalSecurityCount,
    )
    return sorted.at(0).Name
  }

  private GetMostYearlySpeechesSpeaker(): string {
    const year = this._args.YearForSpeechesCount
    const speakers = Object.values(this._speakersDictionary)
    const filtered = speakers.filter((s: Speaker) =>
      s.GetYearlySpeechesCount(year),
    )
    if (filtered.length === 0) {
      return null
    }

    const sorted = filtered.sort(
      (a, b) => b.GetYearlySpeechesCount(year) - a.GetYearlySpeechesCount(year),
    )
    return sorted.at(0).Name
  }

  public GetResult(): IEvaluationResult {
    return {
      leastWordy: this.GetLeastWordySpeaker(),
      mostSecurity: this.GetMostSecuritySpeaker(),
      mostYearlySpeeches: this.GetMostYearlySpeechesSpeaker(),
    }
  }
}
