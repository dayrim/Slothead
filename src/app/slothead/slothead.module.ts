import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotheadComponent } from './components/slothead.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/slothead.reducer';
import { SlotheadShellComponent } from './containers/slothead.shell';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import {
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatInputModule,
  MatSlideToggleModule,
  MatFormFieldModule
} from '@angular/material';

export const COMPONENTS = [];
const slotheadRoutes: Routes = [{ path: '', component: SlotheadShellComponent }];
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  spaceBetween: 5,
  slidesPerView: 1
};
@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDividerModule,
    RouterModule.forChild(slotheadRoutes),
    StoreModule.forFeature('slothead', reducer)
  ],
  declarations: [SlotheadComponent, SlotheadShellComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SlotheadModule {}
