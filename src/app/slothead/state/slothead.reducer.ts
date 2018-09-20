import * as ScoreboardActions from './slothead.actions';
import { Scoreboard, initialState } from '.';

export function reducer(state = initialState, action: ScoreboardActions.Action): Scoreboard {
  switch (action.type) {
    case ScoreboardActions.ScoreboardActionTypes.SetPlayerScore: {
      return {
        ...state,
        playerScore: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
