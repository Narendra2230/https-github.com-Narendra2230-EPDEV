import { NgModule } from '@angular/core';
import { CommonModule,DatePipe  } from '@angular/common';
import { LandingComponent, OnBoardComponent } from './screens/landing/landing.component';
import { MyTimesheetComponent } from './screens/my-timesheet/my-timesheet.component';
import { MyTeamTimesheetComponent } from './screens/my-team-timesheet/my-team-timesheet.component';
import { MyTimesheetEvaluationComponent } from './screens/my-timesheet-evaluation/my-timesheet-evaluation.component';
import { SowshiftRosterComponent } from './screens/sowshift-roster/sowshift-roster.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { TimesheetRouts } from './routes/timesheet-routs';
import { from } from 'rxjs';

import { ToggleCmptComponent } from './components/toggle-cmpt/toggle-cmpt.component';
import { ProjectBillingComponent } from './components/project-billing/project-billing.component';
import { ProjectUnBillingComponent } from './components/project-un-billing/project-un-billing.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ViewTimesheetHeadComponent } from './components/view-timesheet-head/view-timesheet-head.component';
import { ViewTimesheetComponent } from './components/view-timesheet/view-timesheet.component';
import { ToatlBillingHoursComponent } from './components/toatl-billing-hours/toatl-billing-hours.component';
import { TimesheetOptionComponent } from './components/timesheet-option/timesheet-option.component';
import { TimesheetTeamComponent } from './screens/timesheet-team/timesheet-team.component';
import { AssoOnBilableProjectsComponent } from './components/asso-on-bilable-projects/asso-on-bilable-projects.component';
import { AssoNonBillableComponent } from './components/asso-non-billable/asso-non-billable.component';
import { TeamFilterComponent } from './components/team-filter/team-filter.component';
import { ManagerDetailsComponent } from './screens/manager-details/manager-details.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';
import { MngDetailsTimesheetComponent } from './components/mng-details-timesheet/mng-details-timesheet.component';
import { MngTimesheetTableComponent } from './components/mng-timesheet-table/mng-timesheet-table.component';
import { ApproveHelpPopup } from './screens/manager-details/manager-details.component';
import { GlobalDateComponent } from './components/global-date/global-date.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { PreloaderComponent } from 'src/app/components/preloader/preloader.component';
import { SharedModule } from 'src/app/shared.module';
// import { ToastrModule } from 'ngx-toastr';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    LandingComponent,
    ToggleCmptComponent, MyTimesheetComponent, ApproveHelpPopup, 
    MyTeamTimesheetComponent, MyTimesheetEvaluationComponent, 
    ProjectBillingComponent, ProjectUnBillingComponent, PieChartComponent,
     ViewTimesheetHeadComponent, ViewTimesheetComponent, ToatlBillingHoursComponent,
      TimesheetOptionComponent, TimesheetTeamComponent, AssoOnBilableProjectsComponent,
       AssoNonBillableComponent, TeamFilterComponent, ManagerDetailsComponent,
        ManagerProfileComponent, MngDetailsTimesheetComponent, MngTimesheetTableComponent,  GlobalDateComponent,OnBoardComponent, SowshiftRosterComponent
      ],
  imports: [
    CommonModule,
    TimesheetRouts,
    SharedModule,
    MatDialogModule,
    FormsModule,      
    MatSlideToggleModule,
    HighchartsChartModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    MatTooltipModule
    // ToastrModule.forRoot({
    //   timeOut: 10000,
    //   positionClass: 'toast-top-right',
    //   preventDuplicates: true,
    // })
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    MessageService
    
  ],
  entryComponents: [ApproveHelpPopup,OnBoardComponent]
})
export class TimesheetModule { }
