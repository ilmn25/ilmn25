import { Routes } from '@angular/router';
import { Desktop } from './desktop/desktop';
import { Simple } from './simple/simple';

export const routes: Routes = [
  { path: '', redirectTo: '/desktop', pathMatch: 'full' },
  { path: 'desktop', component: Desktop },
  { path: 'simple', component: Simple },
];
