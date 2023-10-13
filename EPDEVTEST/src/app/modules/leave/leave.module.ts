import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './screens/landing/landing.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { LeaveBlancePopup } from './components/apply-leave/apply-leave.component';
import { HolidayCalanderDialog } from './components/apply-leave/apply-leave.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveRouts } from './routes/timesheet-routs';
import { DataService } from 'src/app/services/data.service';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { OnLeaveAssociates, PageHeaderComponent } from './components/page-header/page-header.component';
import { AssociateLeaveComponent } from './screens/associate-leave/associate-leave.component';
import { MatSlideToggleModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {MatTableModule} from '@angular/material/table';
import {CheckboxModule} from 'primeng/checkbox';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [LandingComponent, ApplyLeaveComponent, 
                PageHeaderComponent, AssociateLeaveComponent,
                LeaveBlancePopup,HolidayCalanderDialog, GenericTableComponent,
                OnLeaveAssociates],  
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LeaveRouts,
    MatSlideToggleModule,
    CalendarModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule,
    OverlayPanelModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CheckboxModule
  ],
  providers: [
    DataService,
    LeaveService
  ],
  entryComponents: [LeaveBlancePopup,HolidayCalanderDialog,OnLeaveAssociates],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LeaveModule { }
