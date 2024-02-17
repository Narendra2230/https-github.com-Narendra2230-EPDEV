import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { LandingComponent } from '../screens/landing/landing.component';
import { AssociateLeaveComponent } from '../screens/associate-leave/associate-leave.component';
const routes: Routes = [
  { path: 'leave', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path:'associate-leave', component:AssociateLeaveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LeaveRouts { }
