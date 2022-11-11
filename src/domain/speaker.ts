import DomainError from 'src/errors/domain-error'
import { Speech } from './speech'

export interface ISpeakerArgs {
  Name: string
}

export class Speaker {
  constructor(private _args: ISpeakerArgs) {
    this.IsValidOrThrow()
  }

  private _wordsTotal = 0
  private _internalSecurityCount = 0
  private _yearlySpeechesCount: { [id: number]: number } = {}

  public get Name(): string {
    return this._args.Name
  }

  public get WordsTotal(): number {
    return this._wordsTotal
  }

  public get InternalSecurityCount(): number {
    return this._internalSecurityCount
  }

  public GetYearlySpeechesCount(year: number): number {
    return this._yearlySpeechesCount[year]
  }

  private AddYearlySpeech(speech: Speech): void {
    const speechYear = speech.GetYear()
    const { _yearlySpeechesCount } = this
    if (!_yearlySpeechesCount[speechYear]) {
      _yearlySpeechesCount[speechYear] = 0
    }

    _yearlySpeechesCount[speechYear]++
  }

  private IncrementInternalSecurityCount(speech: Speech): void {
    if (speech.HasInternalSecurityTopic()) {
      this._internalSecurityCount++
    }
  }

  private IncrementWordsTotal(speech: Speech): void {
    this._wordsTotal += speech.Words
  }

  private IsValidOrThrow(): void {
    const hasUndefinedFields = !this._args.Name

    if (hasUndefinedFields) {
      throw new DomainError(
        'Speaker name is undefined, this speaker will be skipped.',
        this._args,
      )
    }
  }

  public TryAddSpeech(speech: Speech): void {
    this.AddYearlySpeech(speech)
    this.IncrementInternalSecurityCount(speech)
    this.IncrementWordsTotal(speech)
  }
}
