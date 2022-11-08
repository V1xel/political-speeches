import { Speech } from './speech'

export interface ISpeakerArgs {
  Speeches: Speech[]
}

// Layer for the domain validation
export class Speaker {
  constructor(private _args: ISpeakerArgs) {}

  public CountYearlySpeaches(year: Date): number {
    return 0
  }

  public CountInternalSecuritySpeaches(): number {
    return 0
  }

  public CountTotalWords(): number {
    return 0
  }
}
