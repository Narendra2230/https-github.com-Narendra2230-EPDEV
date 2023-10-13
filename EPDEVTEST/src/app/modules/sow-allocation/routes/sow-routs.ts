import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { AllocationPageComponent } from '../components/allocation-page/allocation-page.component';
import { ContractorDurationComponent } from '../components/contractor-duration/contractor-duration.component';
import { ContractorSowDurationComponent } from '../components/contractor-sow-duration/contractor-sow-duration.component';
import { FtaDurationComponent } from '../components/fta-duration/fta-duration.component';
import { FtaEmpDurationComponent } from '../components/fta-emp-duration/fta-emp-duration.component';
const routes: Routes = [
  { path: 'sow-allocation', component: AllocationPageComponent },
  { path: 'contractor-sow-duration', component: ContractorDurationComponent },
  { path: 'contractor-emp-duration', component: ContractorSowDurationComponent },
  { path: 'sow-buffer', component: FtaDurationComponent },
  { path: 'fta-emp-duration', component: FtaEmpDurationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SOWRouts { }
