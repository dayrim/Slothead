import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SlotheadAppComponent } from './app-root';
import { PageNotFoundComponent } from './slothead/components/not-found-component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'slothead', pathMatch: 'full' },
  {
    path: '',
    component: SlotheadAppComponent,
    children: [
      {
        path: 'slothead',
        loadChildren: './slothead/slothead.module#SlotheadModule'
      },
      { path: '', redirectTo: 'slothead', pathMatch: 'full' }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
