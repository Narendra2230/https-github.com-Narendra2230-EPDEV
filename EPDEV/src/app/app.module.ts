import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './shell/app.component';
import { OgpbModule } from './modules/ogpb/ogpb.module';
import { SapesModule } from './modules/sapes/sapes.module';
import { TimesheetModule } from './modules/timesheet/timesheet.module';
import { OrgHierarchyModule } from './modules/org-hierarchy/org-hierarchy.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { HttpClientUtil } from './../app/utils/http-client'
import { StorageServiceModule } from 'angular-webstorage-service';
import { HomeService } from './services/omgb/home.service';
import { LoaderService } from './services/loader.service'
import { SidenavService } from './services/side-menu/sidenav.service';
import { from } from 'rxjs';
import { HashLocationStrategy, LocationStrategy, TitleCasePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SharedModule } from './shared.module';
import { TimesheetService } from './services/time-sheet/timesheet.service';
import { LeaveModule } from './modules/leave/leave.module';
import { SowAllocationModule } from './modules/sow-allocation/sow-allocation.module';
import { EsiModule } from './modules/esi/esi.module';
import { ResignationModule } from './modules/Resignation/resignation.module';
import { ProfileModule } from './modules/profile/profile.module';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {AgGridModule} from 'ag-grid-angular';
import { LearningDevelopmentModule } from './modules/learning-development/learning-development.module';
import { AssociateAllocationModule } from './modules/associate-allocation/associate-allocation.module';
import { ResourceAllocationModule } from './modules/resource-allocation/resource-allocation.module';
import { ProductsModule } from './modules/products/products.module';
import { ResourceRequestModule } from './modules/resource-request/resource-request.module';

@NgModule({
  imports: [
    BrowserModule,
    OgpbModule,
    SapesModule,
    TimesheetModule,
    OrgHierarchyModule,
    StorageServiceModule,
    SharedModule,
    LeaveModule,
    LearningDevelopmentModule,
    ProductsModule,
    AssociateAllocationModule,
    SowAllocationModule,
    EsiModule,
    ResignationModule,
    ResourceAllocationModule,
    ResourceRequestModule,
    ProfileModule,
    AppRoutingModule,
    ConfirmDialogModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SideMenuComponent,
    BreadCrumbComponent,
    NotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SideMenuComponent,
    BreadCrumbComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    OverlayPanelModule
  ],
  providers: [HomeService, SidenavService, HttpClientUtil, LoaderService, TitleCasePipe, TimesheetService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
