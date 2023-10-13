import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResignationRouts } from './routes/resignation-routs';
import { ResignationComponent } from './screens/report/report.component';
import { AssociateExitComponent } from './components/associate-exit/associate-exit.component';
import { MatProgressBarModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { LastWorkingDayRenderer } from './components/associate-exit/last-working-renderer';


@NgModule({
  declarations: [ResignationComponent, AssociateExitComponent,LastWorkingDayRenderer],
  imports: [
    CommonModule,
    FormsModule,
    ResignationRouts,
    MatProgressBarModule,
    AgGridModule.withComponents([LastWorkingDayRenderer])
    // AssociateCountRenderer
  ],
  providers: [

  ],
  entryComponents: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ResignationModule { }
