import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OgpbRouts } from './routes/ogpb-routs';
import { LandingComponent } from './screens/landing/landing.component';
import { EmplyeeSnapshotHeaderComponent } from './components/emplyee-snapshot-header/emplyee-snapshot-header.component';
import { ToggleCmptComponent } from './components/toggle-cmpt/toggle-cmpt.component';
import { EmplyeeSnapshotDetailsComponent } from './components/emplyee-snapshot-details/emplyee-snapshot-details.component';
import { EmplyeeSnapshotCalenderComponent } from './components/emplyee-snapshot-calender/emplyee-snapshot-calender.component';
import { PerformanEvalutionComponent } from './components/performan-evalution/performan-evalution.component';
import { PerformanEvalutionLeftComponent } from './components/performan-evalution-left/performan-evalution-left.component';
import { PerformanEvalutionRightComponent } from './components/performan-evalution-right/performan-evalution-right.component';
import { CommentPopup } from './components/performan-evalution-right/performan-evalution-right.component';
import { Ricediscussitionppup } from './components/performan-evalution-right/performan-evalution-right.component';
import { PerformanEvalutionHeaderComponent } from './components/performan-evalution-header/performan-evalution-header.component';
import { WeightageKpiCardComponent } from './components/weightage-kpi-card/weightage-kpi-card.component';
import { RequisitionsComponent } from './components/requisitions/requisitions.component';
import { RequisitionsCardComponent } from './components/requisitions-card/requisitions-card.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { Confirmomponent } from './../sapes/screens/landing/landing.component';
//import { NumericDirective } from '../../utils/numbersonly'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeService } from './../../services/omgb/home.service';

import { from } from 'rxjs';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTeamOgpbComponent } from './screens/my-team-ogpb/my-team-ogpb.component';
import { AssociatesOgpbComponent } from './components/associates-ogpb/associates-ogpb.component';
import { TeamFilterComponent } from './components/team-filter/team-filter.component';
import { HelpPopupComponent } from './components/help-popup/help-popup.component';
import { HelpPopup } from './components/help-popup/help-popup.component';
import { SingleTeamDetailsComponent } from './components/single-team-details/single-team-details.component';
import { SubmitTeamRatingComponent } from './components/submit-team-rating/submit-team-rating.component';
import { Teamratepopup } from './components/submit-team-rating/submit-team-rating.component';
import { OgpbEvaluationComponent, Confirompopup } from './screens/ogpb-evaluation/ogpb-evaluation.component';
import { EmpDetailsComponent } from './components/emp-details/emp-details.component';
import { AssignGoalsBandComponent, AssignGoalsPopup } from './screens/assign-goals-band/assign-goals-band.component';
import { SystemDefinedGoalsComponent,SystemDefinedGoalsPopup } from './components/system-defined-goals/system-defined-goals.component';
import { PreDefinedMeasuresComponent } from './components/pre-defined-measures/pre-defined-measures.component';
import { MeasureReplacepopup } from './components/pre-defined-measures/pre-defined-measures.component';
import { keyInfoPopup } from './components/performan-evalution-header/performan-evalution-header.component';
import { SharedModule } from './../../shared.module';
import {MatSnackBarModule} from '@angular/material';
import { ExecutiveEvaluationComponent } from './screens/executive-evaluation/executive-evaluation.component';
import { ExecutiveComponent } from './components/executive/executive.component';
import { GetExecutiveDashboardComponent } from './components/get-executive-dashboard/get-executive-dashboard.component';


@NgModule({
  declarations: [
    LandingComponent, EmplyeeSnapshotHeaderComponent,
    ToggleCmptComponent, EmplyeeSnapshotDetailsComponent, EmplyeeSnapshotCalenderComponent,
    PerformanEvalutionComponent, PerformanEvalutionLeftComponent, PerformanEvalutionRightComponent,
    PerformanEvalutionHeaderComponent, WeightageKpiCardComponent, RequisitionsComponent,
    RequisitionsCardComponent, DialogContentComponent, Confirmomponent, MyTeamOgpbComponent,
    AssociatesOgpbComponent, TeamFilterComponent, HelpPopupComponent,SystemDefinedGoalsPopup,
    SingleTeamDetailsComponent, SubmitTeamRatingComponent, OgpbEvaluationComponent,
    EmpDetailsComponent, AssignGoalsBandComponent,Confirompopup,AssignGoalsPopup,
    SystemDefinedGoalsComponent, PreDefinedMeasuresComponent, HelpPopup,
    CommentPopup, Teamratepopup, keyInfoPopup, MeasureReplacepopup, Ricediscussitionppup, ExecutiveEvaluationComponent, ExecutiveComponent, GetExecutiveDashboardComponent
  ],
  imports: [
    CommonModule,
    OgpbRouts,
    MatDialogModule,
    MatSlideToggleModule,
    SharedModule,
    FormsModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  entryComponents: [
    CommentPopup, DialogContentComponent, Confirmomponent,SystemDefinedGoalsPopup,Confirompopup,
    HelpPopup, Teamratepopup, keyInfoPopup, MeasureReplacepopup, Ricediscussitionppup,AssignGoalsPopup
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  //  NumericDirective,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SapesModule { }
