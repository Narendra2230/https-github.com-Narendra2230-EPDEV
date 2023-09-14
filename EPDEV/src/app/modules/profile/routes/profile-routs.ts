import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { HrNewAssociatesComponent } from 'src/app/modules/profile/screens/hr-new-associates/hr-new-associates.component';
import { AssestsAllowedComponent } from '../screens/assests-allowed/assests-allowed.component';
import { CompensationBankInfoComponent } from '../screens/compensation-bank-info/compensation-bank-info.component';
import { DashboardComponent } from '../screens/dashboard/dashboard.component';
import { HrAssociatesComponent } from '../screens/hr-associates/hr-associates.component';
import { InsuranceComponent } from '../screens/insurance/insurance.component';
import { OnBoardingComponent } from '../screens/on-boarding/on-boarding.component';
import { ProfileInfoComponent } from '../screens/profile-info/profile-info.component';
import { ProfileManagerViewComponent } from '../screens/profile-manager-view/profile-manager-view.component';
import { ProjectAllocationsComponent } from '../screens/project-allocations/project-allocations.component';
import { TravelInformationComponent } from '../screens/travel-information/travel-information.component';
import {ProfileAssociatesViewComponent} from '../screens/profile-associates-view/profile-associates-view.component'

const routes: Routes = [
  { path: 'profile-landing', component: DashboardComponent },
  { path: 'insurance', component: InsuranceComponent },
  { path: 'assests-allowed', component: AssestsAllowedComponent },
  { path: 'on-boarding', component: OnBoardingComponent },
  { path: 'profile-info', component: ProfileInfoComponent },
  { path: 'project-allocations', component: ProjectAllocationsComponent },
  { path: 'travel-information', component: TravelInformationComponent },
  { path: 'compensation-bank-info', component: CompensationBankInfoComponent },

  { path: 'hr-associates', component: HrAssociatesComponent },
  { path: 'hr-new-associates', component: HrNewAssociatesComponent },
  { path: 'profile-manager-view', component: ProfileManagerViewComponent },
  {path:'profile-finance-view', component:ProfileAssociatesViewComponent},
  { path: 'profile-landing/:empID', component: DashboardComponent },
  { path: 'insurance/:empID', component: InsuranceComponent },
  { path: 'assests-allowed/:empID', component: AssestsAllowedComponent },
  { path: 'on-boarding/:empID', component: OnBoardingComponent },
  { path: 'profile-info/:empID', component: ProfileInfoComponent },
  { path: 'project-allocations/:empID', component: ProjectAllocationsComponent },
  { path: 'travel-information/:empID', component: TravelInformationComponent },
  { path: 'compensation-bank-info/:empID', component: CompensationBankInfoComponent },

  { path: 'profile-landing/:userType/:empID', component: DashboardComponent },
  { path: 'insurance/:userType/:empID', component: InsuranceComponent },
  { path: 'assests-allowed/:userType/:empID', component: AssestsAllowedComponent },
  { path: 'on-boarding/:userType/:empID', component: OnBoardingComponent },
  { path: 'profile-info/:userType/:empID', component: ProfileInfoComponent },
  { path: 'project-allocations/:userType/:empID', component: ProjectAllocationsComponent },
  { path: 'travel-information/:userType/:empID', component: TravelInformationComponent },
  { path: 'compensation-bank-info/:userType/:empID', component: CompensationBankInfoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProfileRouts { }
