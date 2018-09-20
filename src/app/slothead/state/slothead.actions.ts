export enum ScoreboardActionTypes {
  SetPlayerScore = '[SCOREBOARD] LOAD_LOCATIONS'
}
export class SetPlayerScoreAction {
  readonly type = ScoreboardActionTypes.SetPlayerScore;
  constructor(public payload: number) {}
}

export type Action = SetPlayerScoreAction;
