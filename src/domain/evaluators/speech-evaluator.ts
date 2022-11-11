import { Logger } from '@nestjs/common'
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

  public TryAddSpeakerData(data: ICSVSpeech): void {
    let speaker: Speaker = this._speakersDictionary[data.Speaker]

    try {
      if (!speaker) {
        speaker = new Speaker({ Name: data.Speaker })
        this._speakersDictionary[data.Speaker] = speaker
      }

      speaker.TryAddSpeech(
        new Speech({
          Speaker: data.Speaker,
          Topic: data.Topic,
          Date: new Date(data.Date),
          Words: parseInt(data.Words),
        }),
      )
    } catch (error) {
      Logger.warn(error)
    }
  }

  private GetLeastWordySpeaker(): string {
    const speakers = Object.values(this._speakersDictionary)
    const filter = speakers.filter((s: Speaker) => s.HasAtLeastOneSpeech)
    if (filter.length === 0) {
      return null
    }

    const sorted = speakers.sort((a, b) => a.WordsTotal - b.WordsTotal)
    return sorted.at(0).Name
  }

  private GetMostSecuritySpeaker(): string {
    const speakers = Object.values(this._speakersDictionary)
    const filtered = speakers.filter(
      (s: Speaker) => s.InternalSecurityCount > 0,
    )
    if (filtered.length === 0) {
      return null
    }

    const sorted = filtered.sort(
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
