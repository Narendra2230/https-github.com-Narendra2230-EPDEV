import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LandingComponent} from './../screens/landing/landing.component';
import { ProjectHierarchyComponent } from '../screens/project-hierarchy/project-hierarchy.component';
import { BuHierarchyComponent } from '../screens/bu-hierarchy/bu-hierarchy.component';
import { MyReportingComponent } from '../screens/my-reporting/my-reporting.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path: 'orghierarchy', component: LandingComponent},
  {path: 'project-hierarchy', component:ProjectHierarchyComponent},
  {path: 'bu-hierarchy', component:BuHierarchyComponent},
  {path: 'my-reporting', component:MyReportingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgHierarchyRoutingModule { }