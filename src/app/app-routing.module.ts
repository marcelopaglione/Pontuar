import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VotarComponent } from './votar/votar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pontuar' },
  { path: 'pontuar', component: VotarComponent },
  { path: 'home', component: HomeComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
