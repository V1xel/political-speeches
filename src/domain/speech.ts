export interface ISpeechArgs {
  Speaker: string
  Topic: string
  Date: Date
  Words: number
}

// Layer for the domain validation
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
    return this.Topic === Speech.InternalSecurity
  }

  public GetYear(): number {
    return this._args.Date.getFullYear()
  }
}
