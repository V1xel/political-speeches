import { Speech } from './speech'

export interface ISpeakerArgs {
  Name: string
}

// Layer for the domain validation
export class Speaker {
  constructor(private _args: ISpeakerArgs) {}
  private _speechTotal = 0
  private _wordsTotal = 0
  private _internalSecurityCount = 0
  private YearlySpeechesCount: { [id: number]: number }

  public AddSpeech(speech: Speech): void {
    this.AddYearlySpeech(speech)
    this.IncrementInternalSecurityCount(speech)
    this.IncrementWordsTotal(speech)
    this.IncrementSpeechTotal()
  }

  private AddYearlySpeech(speech: Speech): void {
    const speechYear = speech.GetYear()
    const { YearlySpeechesCount } = this
    if (!YearlySpeechesCount[speechYear]) {
      YearlySpeechesCount[speechYear] = 0
    }

    YearlySpeechesCount[speechYear]++
  }

  private IncrementInternalSecurityCount(speech: Speech): void {
    if (speech.HasInternalSecurityTopic()) {
      this._internalSecurityCount++
    }
  }

  private IncrementWordsTotal(speech: Speech): void {
    this._wordsTotal += speech.Words
  }

  private IncrementSpeechTotal(): void {
    this._speechTotal++
  }

  public get Name(): string {
    return this._args.Name
  }

  public get WordsTotal(): number {
    return this._wordsTotal
  }

  public get SpeechTotal(): number {
    return this._speechTotal
  }

  public get InternalSecurityCount(): number {
    return this._internalSecurityCount
  }
}
