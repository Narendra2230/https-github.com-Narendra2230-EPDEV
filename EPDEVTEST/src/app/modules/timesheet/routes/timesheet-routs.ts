import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LandingComponent} from './../screens/landing/landing.component'
import {MyTimesheetComponent} from './../screens/my-timesheet/my-timesheet.component';
import {MyTeamTimesheetComponent} from './../screens/my-team-timesheet/my-team-timesheet.component';
import {MyTimesheetEvaluationComponent} from './../screens/my-timesheet-evaluation/my-timesheet-evaluation.component';
import {TimesheetTeamComponent} from './../screens/timesheet-team/timesheet-team.component';
import {SowshiftRosterComponent} from './../screens/sowshift-roster/sowshift-roster.component';
import {ManagerDetailsComponent} from './../screens/manager-details/manager-details.component'
  import { from } from 'rxjs';
const routes: Routes = [
  { path: 'timesheet', component: LandingComponent },
  { path: 'timesheet-team', component: TimesheetTeamComponent },
  { path: 'sow-shift-roster', component: SowshiftRosterComponent },
  { path: 'manager-details', component: ManagerDetailsComponent },
  { path: '', component: MyTimesheetComponent },
  { path: '', component: MyTeamTimesheetComponent },
  { path: '', component: MyTimesheetEvaluationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,]
})
export class TimesheetRouts { }
