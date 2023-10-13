import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { AllocationService } from "src/app/services/sow-allocation/allocation.service";
import { ContractorSOWDurationVM } from "../../model/contractorsowduration";
@Component({
  selector: 'app-fta-emp-duration',
  templateUrl: './fta-emp-duration.component.html',
  styleUrls: ['./fta-emp-duration.component.css']
})
export class FtaEmpDurationComponent implements OnInit {
  totalhours: number = 0;
  totalhoursIndian: number = 0;
  totalhoursUSA: number = 0;
  totalhoursStr: string = "";
  totalhoursIndianStr: string = "";
  totalhoursUSAStr: string = "";

  totalenteredhours: number = 0;
  totalenteredhoursIndian: number = 0;
  totalenteredhoursUSA: number = 0;
  totalenteredhoursStr: string = "";
  totalenteredhoursIndianStr: string = "";
  totalenteredhoursUSAStr: string = "";

  startDate: string = "";
  endDate: string = "";
  durationList: ContractorSOWDurationVM[] = [];
  durationList1: ContractorSOWDurationVM[] = [];
  isModal: boolean = false;
  data = new MatTableDataSource();
  loading = false;
  displayedColumnDefs = [
    {
      field: "associateId",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Id",
      cellRenderer: "associateId",
      sortable: true,
      width: 180,
    },

    {
      field: "empName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Name",
      cellRenderer: "empName",
      sortable: true,
      width: 200,
    },

    {
      field: "sowId",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Id",
      cellRenderer: "sowId",
      sortable: true,
      width: 240,
    },
    {
      field: "projectId",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Project Id",
      cellRenderer: "projectId",
      sortable: true,
      width: 180,
    },

    {
      field: "enteredHours",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Total Entered Hours",
      cellRenderer: "enteredHours",
      sortable: true,
      width: 220,
    },
    {
      field: "approvedHours",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Total Approved Hours",
      cellRenderer: "approvedHours",
      sortable: true,
      width: 220,
    },
    {
      field: "revisedAllocation",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Revised Allocation",
      cellRenderer: "revisedAllocation",
      sortable: true,
      width: 220,
    },

    {
      field: "startDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Start Date",
      cellRenderer: "startDate",
      sortable: true,
      width: 150,
    },

    {
      field: "endDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "End Date",
      cellRenderer: "endDate",
      sortable: true,
      width: 160,
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
  ];
  displayedRowData = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private gridApi;
  constructor(
    private allocationService: AllocationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // this.GetDurationSOWList();
  }
  changeDate() {
    if (this.startDate != "" && this.endDate != "") {
      this.loading = true;
      var tempStart = this.startDate.split("-");
      var tempend = this.endDate.split("-");
      var tempStartDate =
        tempStart[1] + "-" + tempStart[2] + "-" + tempStart[0];
      var tempEndDate = tempend[1] + "-" + tempend[2] + "-" + tempend[0];
      this.GetDurationSOWList(tempStartDate.toString(), tempEndDate.toString());
    }
  }
  timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }
  GetDurationSOWList(startDate, endDate) {
    this.totalhours = 0;
    this.totalhoursIndian = 0;
    this.totalhoursUSA = 0;
    this.totalenteredhours = 0;
    this.totalenteredhoursIndian = 0;
    this.totalenteredhoursUSA = 0;

    this.allocationService
      .GetDurationFTAEMPSOWList(startDate, endDate)
      .subscribe((res: any[]) => {
        res.filter((data) => {
          data.startDate = this.changeData(data.startDate);
          data.endDate = this.changeData(data.endDate);
          if(data.enteredHours!=null){
            data.enteredHours=this.timeStringToFloat(data.enteredHours);
            this.totalenteredhours = data.enteredHours + this.totalenteredhours;
            if (data.location == "India") {
              this.totalenteredhoursIndian = data.enteredHours + this.totalenteredhoursIndian;
            }
            if (data.location == "US") {
              this.totalenteredhoursUSA = data.enteredHours + this.totalenteredhoursUSA;
            }
          }
          if(data.approvedHours!=null){
            data.approvedHours=this.timeStringToFloat(data.approvedHours);
            this.totalhours = data.approvedHours + this.totalhours;
            if (data.location == "India") {
              this.totalhoursIndian = data.approvedHours + this.totalhoursIndian;
            }
            if (data.location == "US") {
              this.totalhoursUSA = data.approvedHours + this.totalhoursUSA;
            }
            var tempRevised = (data.approvedHours / 180) * 100;
            data.revisedAllocation = tempRevised.toFixed(2);
          }
        });
        this.totalhoursStr = this.totalhours.toFixed(2);
        this.totalhoursIndianStr = this.totalhoursIndian.toFixed(2);
        this.totalhoursUSAStr = this.totalhoursUSA.toFixed(2);
        this.totalenteredhoursStr = this.totalenteredhours.toFixed(2);
        this.totalenteredhoursIndianStr = this.totalenteredhoursIndian.toFixed(2);
        this.totalenteredhoursUSAStr = this.totalenteredhoursUSA.toFixed(2);
        this.durationList = res;
        this.durationList1 = res;
        console.log(this.durationList1);
        this.data = new MatTableDataSource(res);
        this.displayedRowData = res;
        // console.log(this.displayedRowData);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        // console.log("chadrna", this.sort);
        this.loading = false;
      });
  }

  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
}
