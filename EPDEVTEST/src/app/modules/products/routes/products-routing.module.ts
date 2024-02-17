import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequesterLandingComponent } from '../components/requester-landing/requester-landing.component';
import { ProductDashboardComponent} from '../components/product-dashboard/product-dashboard.component'
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { ViewallProductsComponent } from '../components/viewall-products/viewall-products.component';
import { DetailedRequestComponent } from '../components/detailed-request/detailed-request.component';

const routes: Routes = [
  { path :'requester-landing', component: RequesterLandingComponent },
  { path :'view-allproducts',component: ViewallProductsComponent},
  { path :'detailed-Request/:id', component: DetailedRequestComponent},
  { path :'product-dashboard',component: ProductDashboardComponent},
  { path :'admin-dashboard', component: AdminDashboardComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
