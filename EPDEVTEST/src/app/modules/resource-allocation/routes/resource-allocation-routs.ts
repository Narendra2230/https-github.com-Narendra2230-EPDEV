import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { ResourceAllocationByAssociateComponent } from '../components/resource-allocation-by-associate/resource-allocation-by-associate.component';
const routes: Routes = [
  { path: 'Resource-Allocation', component: ResourceAllocationByAssociateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ResourceAllocationRouts { }
