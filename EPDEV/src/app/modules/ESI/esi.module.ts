import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ESIRoutes } from './routes/esi-routs';
import { MatSlideToggleModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {MatTableModule} from '@angular/material/table';
import {CheckboxModule} from 'primeng/checkbox';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ReportComponent } from './screens/report/report.component';
import { ReportHeaderComponent } from './components/report-header/report-header.component';



@NgModule({
  declarations: [ReportComponent, ReportHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ESIRoutes,
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
   
  ],
  entryComponents: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EsiModule { }
