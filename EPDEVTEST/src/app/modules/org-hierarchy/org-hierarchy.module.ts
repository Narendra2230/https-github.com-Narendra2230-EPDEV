import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent, ListComponent, ProfileComponent } from './screens/landing/landing.component';
import { ProjectHierarchyComponent, LeadsListComponent } from './screens/project-hierarchy/project-hierarchy.component';
import { BuHierarchyComponent, BuLeadsListComponent } from './screens/bu-hierarchy/bu-hierarchy.component';
import { MyReportingComponent } from './screens/my-reporting/my-reporting.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OrgHierarchyRoutingModule } from './routes/org-hierarchy-routs';
import { from } from 'rxjs';
import { OrgHierarchyHeaderComponent } from './components/org-hierarchy-header/org-hierarchy-header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
     LandingComponent,ProjectHierarchyComponent,
     BuHierarchyComponent,MyReportingComponent, OrgHierarchyHeaderComponent,
     ListComponent,LeadsListComponent,ProfileComponent,BuLeadsListComponent
  ],
  imports: [
    CommonModule,
    OrgHierarchyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
    

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrgHierarchyModule { }
