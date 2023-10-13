import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { AssociateAllocationAgingComponent } from '../components/associate-allocation-aging/associate-allocation-aging.component';
import { AssociateAllocationPageComponent } from '../components/associate-allocation-page/associate-allocation-page.component';
const routes: Routes = [
  { path: 'associate-allocation', component: AssociateAllocationPageComponent },
  { path: 'associate-allocation-aging', component: AssociateAllocationAgingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AllocationRouts { }
