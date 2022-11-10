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

  private CheckDateIsValid(text: string): boolean {
    const date = new Date(text)
    const timestamp = Date.parse(text)
    return date instanceof Date && !isNaN(timestamp)
  }

  private CheckWordsIsValid(text: string): boolean {
    return typeof text === 'string' && !isNaN(parseInt(text))
  }

  public CheckDataIsValid(data: ICSVSpeech): boolean {
    const hasUndefinedFields =
      !data.Date || !data.Speaker || !data.Topic || !data.Words

    const dateIsValid = this.CheckDateIsValid(data.Date)
    const wordsIsValid = this.CheckWordsIsValid(data.Words)

    return !hasUndefinedFields && dateIsValid && wordsIsValid
  }

  public AddSpeakerData(data: ICSVSpeech): void {
    let speaker: Speaker = this._speakersDictionary[data.Speaker]

    if (!speaker) {
      speaker = new Speaker({ Name: data.Speaker })
      this._speakersDictionary[data.Speaker] = speaker
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
