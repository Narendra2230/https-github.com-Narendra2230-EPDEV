import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { AssociateExitComponent } from '../components/associate-exit/associate-exit.component';
import { ResignationComponent } from '../screens/report/report.component';

const routes: Routes = [
  { path: 'resignation', component: ResignationComponent },
  { path: 'associate-exit', component: AssociateExitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ResignationRouts { }

