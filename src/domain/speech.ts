import DomainError from '../errors/domain-error'

export interface ISpeechArgs {
  Speaker: string
  Topic: string
  Date: Date
  Words: number
}

export class Speech {
  public static readonly InternalSecurity = 'Internal Security'
  private static readonly MinialAlowedWordsCount = 0
  constructor(private _args: ISpeechArgs) {
    this.IsValidOrThrow()
  }

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

  private IsValidOrThrow(): void {
    const hasUndefinedFields = !this._args.Speaker || !this._args.Topic
    if (hasUndefinedFields) {
      throw new DomainError(
        'At least one Speech argument is undefined.',
        this._args,
      )
    }

    this.CheckDateIsValidOrThrow()
    this.CheckWordsIsValidOrThrow()
  }

  private CheckDateIsValidOrThrow(): void {
    const date = this._args.Date

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new DomainError(
        'Speech argument Date is invalid, this speech will be skipped.',
        this._args,
      )
    }
  }

  private CheckWordsIsValidOrThrow(): void {
    const words = this._args.Words
    if (words < Speech.MinialAlowedWordsCount) {
      throw new DomainError(
        'Speech argument Words contains less then allowed amount, this speech will be skipped.',
        this._args,
      )
    }

    if (isNaN(words)) {
      throw new DomainError(
        'Speech argument Words cant be not a number, this speech will be skipped.',
        this._args,
      )
    }

    return
  }
}
