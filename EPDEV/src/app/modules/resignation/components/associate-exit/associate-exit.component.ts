import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { DataService } from 'src/app/services/data.service';
import { ResignationService } from 'src/app/services/resignation/resignation.service';
import { AllocationService } from 'src/app/services/sow-allocation/allocation.service';
import { LastWorkingDayRenderer } from './last-working-renderer';

@Component({
  selector: 'app-associate-exit',
  templateUrl: './associate-exit.component.html',
  styleUrls: ['./associate-exit.component.css']
})
export class AssociateExitComponent implements OnInit {
  Id:number=0;
  data = new MatTableDataSource();
  loading = true;
  displayedColumnDefs = [
    {
      field: "exitid",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Exit Id",
      cellRenderer: "exitid",
      sortable: true,
      width: 120,
    },
    {
      field: "emp_Id",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Id",
      cellRenderer: "emp_Id",
      sortable: true,
      width: 120,
    },

    {
      field: "name",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Name",
      cellRenderer: "name",
      sortable: true,
      width: 180,
    },

    {
      field: "btu",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "BTU",
      cellRenderer: "btu",
      sortable: true,
      width: 120,
    },

    {
      field: "reportingmanager",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Reporting Manager",
      cellRenderer: "reportingmanager",
      sortable: true,
      width: 240,
    },

    {
      field: "hrbp",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "HRBP",
      cellRenderer: "hrbp",
      sortable: true,
      width: 220,
    },

    {
      field: "location",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Location",
      cellRenderer: "location",
      sortable: true,
      width: 160,
    },

    {
      field: "designationName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Designation",
      cellRenderer: "designationName",
      sortable: true,
      width: 160,
    },

    {
      field: "comments",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "comments",
      cellRenderer: "comments",
      sortable: true,
      width: 150,
    },

    {
      field: "datE_OF_RESIGNATION",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Date of Resignation",
      cellRenderer: "datE_OF_RESIGNATION",
      sortable: true,
      width: 160,
    },

    {
      field: "reasonName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Reason Name",
      cellRenderer: "reasonName",
      sortable: true,
      width: 160,
    },

    {
      field: "noticE_PERIOD_DAYS",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Notice Period Days",
      cellRenderer: "noticE_PERIOD_DAYS",
      sortable: true,
      width: 200,
    },
    {
      field: "personaL_EMAIL_ID",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Personal Email",
      cellRenderer: "personaL_EMAIL_ID",
      sortable: true,
      width: 200,
    },
    {
      field: "contacT_NUMBER",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Contact Number",
      cellRenderer: "contacT_NUMBER",
      sortable: true,
      width: 200,
    },
    {
      field: "lastWorkingDay",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "lastWorkingDay",
      cellStyle: { textAlign: "center" },
      width: 250,
    },
  ];

  frameworkComponents = {
    statusRenderer: LastWorkingDayRenderer,
  };
  displayedRowData = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private gridApi;
  constructor(
    private allocationService: ResignationService,
    private dataService: DataService,
    private _alert: AlertMessageService
  ) {}

  ngOnInit() {
    this.GetExitList();
    let user = localStorage.getItem("USER_SESSION_DETAILS").toString();
    let JsonUser = JSON.parse(user);
    var halfPart = JsonUser.toString().split('"id":')[1].split(",")[0];
    this.Id = +halfPart;
  }
  GetExitList(){
    this.loading = true;
    this.allocationService
    .GetExitAssociate()
    .subscribe((res: any[]) => {
      console.log(res)
      res.filter((data)=>{
        data.datE_OF_RESIGNATION=this.changeData(data.datE_OF_RESIGNATION);
        data.lastWorkingDay=this.changeDatayyyyMMdd(data.lastWorkingDay);
      })
      this.data = new MatTableDataSource(res);
        this.displayedRowData = res;
        // console.log(this.displayedRowData);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        // console.log("chadrna", this.sort);
        this.loading = false;
    })
  }
  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
  changeDatayyyyMMdd(date) {
    return this.dataService.dateFormatter(date, "yyyy-MM-dd");
  }
  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
  changeStatus(exitPrimaryId: number, lastWorkingDay: any) {
    var payload = {
      Id: exitPrimaryId,
      hRId: this.Id,
      lastWorkingDay: lastWorkingDay,
    };
    console.log(payload);
    this.allocationService.PostExitHRAssociateLastworkingDay(payload).subscribe((data) => {
      console.log(data);
      this._alert.succuss("Last working day updated successfully.");
    });
  }
}
