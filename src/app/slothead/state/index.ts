import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export interface Scoreboard {
  playerScore: number;
  minScore: number;
  maxScore: number;
}

export const initialState: Scoreboard = {
  playerScore: 5000,
  maxScore: 5000,
  minScore: 0
};

const getWeatherFeatureState: MemoizedSelector<object, Scoreboard> = createFeatureSelector<
  Scoreboard
>('slothead');

export const getPlayerScore: MemoizedSelector<object, Number> = createSelector(
  getWeatherFeatureState,
  state => state.playerScore
);
export const getMaxScore: MemoizedSelector<object, Number> = createSelector(
  getWeatherFeatureState,
  state => state.maxScore
);
export const getMinScore: MemoizedSelector<object, Number> = createSelector(
  getWeatherFeatureState,
  state => state.minScore
);
