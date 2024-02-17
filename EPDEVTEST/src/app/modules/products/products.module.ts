import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./routes/products-routing.module";
import { RequesterLandingComponent } from "./components/requester-landing/requester-landing.component";
import { AdminDashboardComponent } from "./components//admin-dashboard/admin-dashboard.component";
import { ProductDashboardComponent } from "./components/product-dashboard/product-dashboard.component";
import { ViewallProductsComponent } from "./components/viewall-products/viewall-products.component";
import { DetailedRequestComponent } from "./components/detailed-request/detailed-request.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material";
import { AgGridModule } from "ag-grid-angular";
import { RequestLandingRenderer } from "./components/requester-landing/requesterlanding-rendere";
import { ViewAllRendere } from "./components/viewall-products/ViewallRenderer";
import { ProductRenderer } from "./components/product-dashboard/productRenderer";
import { HistoryViewMoreRenderer } from "./components/detailed-request/history-view-more.rendere";

@NgModule({
  declarations: [
    RequesterLandingComponent,
    AdminDashboardComponent,
    ProductDashboardComponent,
    ViewallProductsComponent,
    DetailedRequestComponent,
    RequestLandingRenderer,
    ViewAllRendere,
    ProductRenderer,
    HistoryViewMoreRenderer
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    AgGridModule.withComponents([
      RequestLandingRenderer,
      ViewAllRendere,
      ProductRenderer,
      HistoryViewMoreRenderer
    ]),
    // [AssociateAllocationRenderer,AssociateResumePathRenderer]
  ],
})
export class ProductsModule {}
