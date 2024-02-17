import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SOWRouts } from './routes/sow-routs';
import { AllocationPageComponent } from './components/allocation-page/allocation-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressBarModule } from '@angular/material';
import { AssociateCountRenderer } from './components/allocation-page/associate-count-renderer';
import { FormsModule } from '@angular/forms';
import { AssociateCountTableComponent } from './components/associate-count-table/associate-count-table.component';
import { ContractorDurationComponent } from './components/contractor-duration/contractor-duration.component';
import { ContractorSowDurationComponent } from './components/contractor-sow-duration/contractor-sow-duration.component';
import { FtaEmpDurationComponent } from './components/fta-emp-duration/fta-emp-duration.component';
import { FtaDurationComponent } from './components/fta-duration/fta-duration.component';
import { FtaCountRenderer } from './components/fta-duration/associate-count-renderer';



@NgModule({
  declarations: [AllocationPageComponent,AssociateCountRenderer, AssociateCountTableComponent, ContractorDurationComponent, ContractorSowDurationComponent,FtaEmpDurationComponent, FtaDurationComponent,FtaCountRenderer],
  imports: [
    CommonModule,
    SOWRouts,
    FormsModule,
    MatProgressBarModule,
    AgGridModule.withComponents([AssociateCountRenderer,FtaCountRenderer])
    // [ProfileAvatarRenderer, ProfileEmpNameRenderer, ProfileStatusRenderer, AvatarRenderer, EmpNameRenderer, StatusRenderer,]

  ]
})
export class SowAllocationModule { }
