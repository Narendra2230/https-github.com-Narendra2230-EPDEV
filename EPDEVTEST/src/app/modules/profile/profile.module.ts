import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceComponent } from './screens/insurance/insurance.component';
import { AssestsAllowedComponent } from './screens/assests-allowed/assests-allowed.component';
import { OnBoardingComponent } from './screens/on-boarding/on-boarding.component';
import { ProfileInfoComponent } from './screens/profile-info/profile-info.component';
import { ProjectAllocationsComponent } from './screens/project-allocations/project-allocations.component';
import { TravelInformationComponent } from './screens/travel-information/travel-information.component';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ProfileRouts } from './routes/profile-routs';
import { CompensationBankInfoComponent, CompensationHistory } from './screens/compensation-bank-info/compensation-bank-info.component';
import { ProfilePageHeaderComponent } from './components/profile-page-header/profile-page-header.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatPaginatorModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CheckboxModule } from 'primeng/checkbox';
import { ProfileManagerViewComponent } from './screens/profile-manager-view/profile-manager-view.component';
import { HrAssociatesComponent, NewEntries, StatusChangeComponent } from './screens/hr-associates/hr-associates.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HrNewAssociatesComponent } from 'src/app/modules/profile/screens/hr-new-associates/hr-new-associates.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {AgGridModule} from 'ag-grid-angular';
import { ProfileAssociatesViewComponent } from './screens/profile-associates-view/profile-associates-view.component';
import { EncryptionService } from 'src/app/services/encryption.service';
import { AvatarRenderer } from './screens/hr-associates/hr-associate-avatar-renderer';
import { EmpNameRenderer } from './screens/hr-associates/hr-associate-emp-name-renderer';
import { StatusRenderer } from './screens/hr-associates/hr-associate-status-renderer';
import { ProfileAvatarRenderer } from './screens/profile-associates-view/profile-associate-avatar-renderer';
import { ProfileEmpNameRenderer } from './screens/profile-associates-view/profile-associate-emp-name-renderer';
import { ProfileStatusRenderer } from './screens/profile-associates-view/profile-associate-status-renderer';

@NgModule({
  declarations: [EmpNameRenderer, CompensationHistory,HrNewAssociatesComponent, StatusChangeComponent ,NewEntries, DashboardComponent, InsuranceComponent, AssestsAllowedComponent, OnBoardingComponent, ProfileInfoComponent, ProjectAllocationsComponent, TravelInformationComponent, CompensationBankInfoComponent, ProfilePageHeaderComponent, ProfileManagerViewComponent, ProfileAssociatesViewComponent, HrAssociatesComponent, AvatarRenderer, StatusRenderer, ProfileStatusRenderer, ProfileEmpNameRenderer, ProfileAvatarRenderer],
  imports: [
    CommonModule,
    ProfileRouts,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CalendarModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ToastModule,
    OverlayPanelModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CheckboxModule,
    MatProgressBarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    AgGridModule.withComponents([ProfileAvatarRenderer, ProfileEmpNameRenderer, ProfileStatusRenderer, AvatarRenderer, EmpNameRenderer, StatusRenderer,])
  ],
  entryComponents: [NewEntries,CompensationHistory,StatusChangeComponent],
  providers: [ProfileService, EncryptionService]
})
export class ProfileModule { }
