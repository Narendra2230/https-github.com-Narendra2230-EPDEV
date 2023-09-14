import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationRouts } from './routes/allocation-routs';
import { AssociateAllocationPageComponent } from './components/associate-allocation-page/associate-allocation-page.component';
import { MatProgressBarModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { AssociateAllocationRenderer } from './components/associate-allocation-page/associate-allocation-renderer';
import { FormsModule } from '@angular/forms';
import { AssociateEmployeeAllocationComponent } from './components/associate-employee-allocation/associate-employee-allocation.component';
import { AssociateResumePathRenderer } from './components/associate-allocation-page/associate-resume-path-renderer';
import { AssociateAllocationAgingComponent } from './components/associate-allocation-aging/associate-allocation-aging.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [AssociateAllocationPageComponent,AssociateAllocationRenderer, AssociateEmployeeAllocationComponent,AssociateResumePathRenderer, AssociateAllocationAgingComponent],
  imports: [
    CommonModule,
    AllocationRouts,
    FormsModule,
    MatProgressBarModule,
    AgGridModule.withComponents([AssociateAllocationRenderer,AssociateResumePathRenderer]),
    // NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AssociateAllocationModule { }
