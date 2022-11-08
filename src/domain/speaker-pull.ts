import { Speaker } from './speaker'

export interface ISpeakerPullArgs {
  Speakers: Speaker[]
}

// Layer for the domain validation
export class SpeakerPull {
  constructor(private _args: ISpeakerPullArgs) {}

  public GetMostSpeechesYearlySpeaker(year: Date): Speaker {
    const { Speakers } = this._args

    if (!Speakers || Speakers.length == 0)
      throw new Error('Invalid data, Speakers array cant be null or epmty')

    return Speakers.sort(
      (a, b) => a.CountYearlySpeaches(year) - b.CountYearlySpeaches(year),
    ).at(0)
  }

  public GetMostInternalSecuritySpeechesSpeaker(): Speaker {
    const { Speakers } = this._args

    if (!Speakers || Speakers.length == 0)
      throw new Error('Invalid data, Speakers array cant be null or epmty')

    return Speakers.sort(
      (a, b) =>
        a.CountInternalSecuritySpeaches() - b.CountInternalSecuritySpeaches(),
    ).at(0)
  }

  public GetFewestWordsSpeaker(): Speaker {
    const { Speakers } = this._args

    if (!Speakers || Speakers.length == 0)
      throw new Error('Invalid data, Speakers array cant be null or epmty')

    return Speakers.sort(
      (a, b) => b.CountTotalWords() - a.CountTotalWords(),
    ).at(0)
  }
}
