import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Scoreboard } from '../state';
import * as ScoreboardActions from '../state/slothead.actions';
import * as ScoreboardSelector from '../state';

@Component({
  template: `

  <app-slothead #slothead
   [playerScore]="playerScore$ | async"
   [maxScore]="maxScore$ | async"
   [minScore]="minScore$ | async"
   (scoreIsSet)="setScore($event)"
  >
   </app-slothead>`,
  styles: ['']
})
export class SlotheadShellComponent implements OnInit {
  playerScore$: Observable<Number>;
  maxScore$: Observable<Number>;
  minScore$: Observable<Number>;

  constructor(private store: Store<Scoreboard>) {}
  ngOnInit(): void {
    this.playerScore$ = this.store.pipe(select(ScoreboardSelector.getPlayerScore));
    this.maxScore$ = this.store.pipe(select(ScoreboardSelector.getMaxScore));
    this.minScore$ = this.store.pipe(select(ScoreboardSelector.getMinScore));
  }
  setScore(score: number): void {
    this.store.dispatch(new ScoreboardActions.SetPlayerScoreAction(score));
  }
}
