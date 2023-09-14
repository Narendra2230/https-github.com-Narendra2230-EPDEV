import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceAllocationByAssociateComponent } from './components/resource-allocation-by-associate/resource-allocation-by-associate.component';
import { ResourceAllocationRouts } from './routes/resource-allocation-routs';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [ResourceAllocationByAssociateComponent],
  imports: [
    CommonModule,
    ResourceAllocationRouts,
    FormsModule,
    MatProgressBarModule,
    AgGridModule.withComponents()
    // [AssociateCountRenderer]
  ]
})
export class ResourceAllocationModule { }
