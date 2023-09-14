import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ResourceRequestService } from 'src/app/services/resource-request/resource-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ColDef } from 'ag-grid-community';
import { DateRenderer } from './date-renderer';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css','../../styles.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private resourceService:ResourceRequestService,
     private router: Router,private route:ActivatedRoute,
     private encryptionService: EncryptionService, private elementRef : ElementRef) { }
  
  userData;
  data = new MatTableDataSource();
  loading = true;
  displayedColumnDefs = [
    {
      field: "approvalStatus",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Approval Status",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "assignedTo",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Assigned To",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "assignedGroup",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Assigned Group",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "resourcePriority",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Resource Priority",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
      // cellStyle: { textAlign: "center" },
    },
    {
      field: "createdDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Created Date",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "updateDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Updated Date",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "updatedBy",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Updated By",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    },
    {
      field: "aging",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Aging",
      cellRenderer: params => params.value == null ? "N/A" : params.value,
      sortable: true
    }

  ];
  displayedRowData = [];
  frameworkComponents = {
    dateRenderer: DateRenderer
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  gridApi;
  defaultColDef : ColDef = {
    sortable:true,filter:true
  }
  rowData;
  Id;

ngOnInit() {
    let data = {
      "id":this.encryptionService.deCryptEmpID(this.route.snapshot.paramMap.get('id'))
    }
    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = 'assets/js/custom.js';
    // this.elementRef.nativeElement.appendChild(s);
     this.resourceService.GetSingleRecord(data).subscribe(
      (response:any)=>{
        console.log(response)
        this.userData = response
          this.data = new MatTableDataSource(response);
          this.displayedRowData = response.resourceRequestHistories;
          this.data.paginator = this.paginator;
          this.data.sort = this.sort;
          this.loading = false;
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    )
  }

  onGridReady(event:any){
    this.gridApi = event.api;
  }

}
