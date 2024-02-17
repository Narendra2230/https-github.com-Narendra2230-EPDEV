import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceRequestRouts } from './routes/resource-request-routs';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ActionRenderer } from './components/landing-page/action-renderer';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DateRenderer } from './components/user-profile/date-renderer';

@NgModule({
  declarations: [ NewRequestComponent, UserProfileComponent,ActionRenderer, LandingPageComponent,DateRenderer],
  imports: [
    CommonModule,
    ResourceRequestRouts,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    AgGridModule.withComponents([ActionRenderer,DateRenderer])
    
  ]
})
export class ResourceRequestModule { }
