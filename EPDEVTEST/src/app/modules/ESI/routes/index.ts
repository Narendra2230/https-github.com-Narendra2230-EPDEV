import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { ReportComponent } from '../screens/report/report.component';
const routes: Routes = [
  { path: 'mbr', component: ReportComponent },
  { path: 'landing', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ESIRoutes { }
