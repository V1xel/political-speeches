export interface ISpeechArgs {
  Speaker: string
  Topic: string
  Date: Date
  Words: number
}

export class Speech {
  public static readonly InternalSecurity = 'Internal Security'
  constructor(private _args: ISpeechArgs) {}

  public get Speaker(): string {
    return this._args.Speaker
  }

  public get Topic(): string {
    return this._args.Topic
  }

  public get Words(): number {
    return this._args.Words
  }

  public HasInternalSecurityTopic(): boolean {
    return this.Topic.toLowerCase() === Speech.InternalSecurity.toLowerCase()
  }

  public GetYear(): number {
    const { Date } = this._args
    return Date.getFullYear()
  }

  private CheckDateIsValid(): boolean {
    const date = this._args.Date
    return date instanceof Date && !isNaN(date.getTime())
  }

  private CheckWordsIsValid(): boolean {
    const words = this._args.Words
    return !isNaN(words)
  }

  public IsValid(): boolean {
    const hasUndefinedFields = !this._args.Speaker || !this._args.Topic
    const dateIsValid = this.CheckDateIsValid()
    const wordsIsValid = this.CheckWordsIsValid()

    return !hasUndefinedFields && dateIsValid && wordsIsValid
  }
}
