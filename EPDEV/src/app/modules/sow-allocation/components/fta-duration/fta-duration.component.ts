import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { AllocationService } from "src/app/services/sow-allocation/allocation.service";
import { ContractordurationVM } from "../../model/contractorduration";
import { AssociateCountTableComponent } from "../associate-count-table/associate-count-table.component";
import { FtaCountRenderer } from "./associate-count-renderer";

@Component({
  selector: "app-fta-duration",
  templateUrl: "./fta-duration.component.html",
  styleUrls: ["./fta-duration.component.css"],
})
export class FtaDurationComponent implements OnInit {
  @ViewChild(AssociateCountTableComponent, { static: true })
  countTable: AssociateCountTableComponent;
  totalhours: number = 0;
  offShore: number = 180;
  onSite: number = 160;
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
  durationList: any[] = [];
  isModal: boolean = false;
  data = new MatTableDataSource();
  loading = false;
  displayedColumnDefs = [

    {
      field: "customerName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Customer Name",
      cellRenderer: "customerName",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 160,
    },

    {
      field: "csu",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "CSU",
      cellRenderer: "csu",
      sortable: true,
      width: 120,
    },

    {
      field: "projectId",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Uniquee Id",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 120,
    },

    {
      field: "sowId",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Id",
      cellRenderer: "sowId",
      sortable: true,
      width: 250,
    },

    {
      field: "btuName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "BTU",
      cellRenderer: "btuName",
      sortable: true,
      width: 120,
    },

    {
      field: "buffer",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Buffer",
      cellRenderer: "buffer",
      sortable: true,
      cellStyle: { color: "#333", "font-weight": "bold" },
      width: 200,
    },

    {
      field: "totalPercentAlloc",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "FTAs Total Allocation %",
      cellRenderer: "totalPercentAlloc",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 220,
    },
    {
      field: "FTAFTE",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "FTA FTE",
      cellRenderer: "FTAFTE",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 120,
    },

    {
      field: "enteredHours",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "FTAs Total Entered Hrs",
      cellRenderer: "enteredHours",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 200,
    },
    {
      field: "approvedHours",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "FTAs Total Approved Hrs",
      cellRenderer: "approvedHours",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 200,
    },

    {
      field: "revisedAllocation",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "FTA Revised Allocation",
      cellRenderer: "revisedAllocation",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 200,
    },

    {
      field: "contractorEnteredHours",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Contract Total Entered Hrs",
      cellRenderer: "contractorEnteredHours",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 230,
    },
    {
      field: "contractorApprHours",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Contract Total Approved Hrs",
      cellRenderer: "contractorApprHours",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 230,
    },

    {
      field: "contractAllocation",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Contract Revised Allocation",
      cellRenderer: "contractAllocation",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 230,
    },

    {
      field: "FTACRA",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "FTA + CRA",
      cellRenderer: "FTACRA",
      sortable: true,
      width: 200,
    },

    {
      field: "offshore",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Budgeted  Offshore HC",
      cellRenderer: "offshore",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 200,
    },

    {
      field: "onshore",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Budgeted  Onsite HC",
      cellRenderer: "onshore",
      sortable: true,
      cellStyle: { textAlign: "center" },
      width: 200,
    },

    {
      field: "location",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Location",
      cellRenderer: "location",
      sortable: true,
      width: 150,
    },

    {
      field: "allocationType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "AllocationType",
      cellRenderer: "allocationType",
      sortable: true,
      width: 200,
    },

    {
      field: "sowStartDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW StartDate",
      cellRenderer: "sowStartDate",
      sortable: true,
      width: 200,
    },

    {
      field: "sowEndDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW EndDate",
      cellRenderer: "sowEndDate",
      sortable: true,
      width: 200,
    },

    {
      field: "sowManager",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Manager",
      cellRenderer: "sowManager",
      sortable: true,
      width: 200,
    },
  ];
  displayedRowData = [];
  frameworkComponents = {
    statusRenderer: FtaCountRenderer,
  };
  selectedSowId = 0;
  sowFullName = "";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private gridApi;
  constructor(
    private allocationService: AllocationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // this.GetDurationList();
  }
  changeDate() {
    if (this.startDate != "" && this.endDate != "") {
      this.loading = true;
      var tempStart = this.startDate.split("-");
      var tempend = this.endDate.split("-");
      var tempStartDate =
        tempStart[1] + "-" + tempStart[2] + "-" + tempStart[0];
      var tempEndDate = tempend[1] + "-" + tempend[2] + "-" + tempend[0];
      this.GetDurationList(tempStartDate.toString(), tempEndDate.toString());
    }
  }
  timeStringToFloat(time) {
    console.log(time)
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }
  GetDurationList(tempStartDate, tempEndDate) {
    this.totalhours = 0;
    this.totalhoursIndian = 0;
    this.totalhoursUSA = 0;
    this.totalenteredhours = 0;
    this.totalenteredhoursIndian = 0;
    this.totalenteredhoursUSA = 0;
    this.allocationService
      .GetFTADurationList(tempStartDate, tempEndDate)
      .subscribe((res: any[]) => {
        this.durationList = res;
        res.filter((data) => {
          data.startDate = this.changeData(data.startDate);
          data.endDate = this.changeData(data.endDate);
          if (data.contractorEnteredHours != null) {
            data.contractorEnteredHours = this.timeStringToFloat(
              data.contractorEnteredHours
            );
          }
          data.FTAFTE = data.totalPercentAlloc / 100;
          let FTACRA = data.FTAFTE;
          if (data.enteredHours != null) {
            data.enteredHours = this.timeStringToFloat(data.enteredHours);
            var tempRevised = (data.enteredHours / 180) * 100;
            this.totalenteredhours = tempRevised + this.totalenteredhours;
            if (data.location == "India") {
              this.totalenteredhoursIndian =
                tempRevised + this.totalenteredhoursIndian;
            }
            if (data.location == "US") {
              this.totalenteredhoursUSA = tempRevised + this.totalenteredhoursUSA;
            }
          }
          if (data.approvedHours != null) {
            data.approvedHours = this.timeStringToFloat(data.approvedHours);
            var tempRevised = (data.approvedHours / 180) * 100;
            this.totalhours = tempRevised + this.totalhours;
            if (data.location == "India") {
              this.totalhoursIndian = tempRevised + this.totalhoursIndian;
            }
            if (data.location == "US") {
              this.totalhoursUSA = tempRevised + this.totalhoursUSA;
            }
            data.revisedAllocation = tempRevised.toFixed(2);
          }
          if (data.contractorApprHours != null) {
            data.contractorApprHours = this.timeStringToFloat(
              data.contractorApprHours
            );
            var tempRevised = (data.contractorApprHours / this.offShore);
            if (data.location == "US") {
              tempRevised = (data.contractorApprHours / this.onSite);
            }

            FTACRA = tempRevised + FTACRA;
            data.contractAllocation = tempRevised.toFixed(2);
          }
          let FtrCras = FTACRA;
          if (data.location == "US") {
            data.buffer = (FtrCras - data.onshore).toFixed(2);
          } else {
            data.buffer = (FtrCras - data.offshore).toFixed(2);
          }
          data.FTACRA = FtrCras.toFixed(2);
        });
        this.totalhoursStr = this.totalhours.toFixed(2);
        this.totalhoursIndianStr = this.totalhoursIndian.toFixed(2);
        this.totalhoursUSAStr = this.totalhoursUSA.toFixed(2);
        this.totalenteredhoursStr = this.totalenteredhours.toFixed(2);
        this.totalenteredhoursIndianStr = this.totalenteredhoursIndian.toFixed(2);
        this.totalenteredhoursUSAStr = this.totalenteredhoursUSA.toFixed(2);
        this.data = new MatTableDataSource(this.durationList);
        this.displayedRowData = this.durationList;
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        this.loading = false;
      });
  }
  // UpdateCRevised() {
  //   console.log(this.offShore, this.onSite);
  //   this.durationList.filter((data) => {
  //     data.FTAFTE = data.totalPercentAlloc / 100;
  //     let FTACRA = data.FTAFTE;
  //     if (data.contractorApprHours != null) {
  //       var tempRevised = (data.contractorApprHours / this.offShore) * 100;
  //       if (data.location == "US") {
  //         console.log(data.contractorApprHours,this.onSite,data.location)
  //         tempRevised = (data.contractorApprHours / this.onSite) * 100;
  //       }

  //       FTACRA = tempRevised + FTACRA;
  //       data.contractAllocation = tempRevised.toFixed(2);
  //     }
  //     let FtrCras = FTACRA;
  //     if (data.location == "US") {
  //       data.buffer = (FtrCras - data.onshore).toFixed(2);
  //     } else {
  //       data.buffer = (FtrCras - data.offshore).toFixed(2);
  //     }
  //     data.FTACRA = FtrCras.toFixed(2);
  //   });
  //   this.totalhoursStr = this.totalhours.toFixed(2);
  //   this.totalhoursIndianStr = this.totalhoursIndian.toFixed(2);
  //   this.totalhoursUSAStr = this.totalhoursUSA.toFixed(2);
  //   this.totalenteredhoursStr = this.totalenteredhours.toFixed(2);
  //   this.totalenteredhoursIndianStr = this.totalenteredhoursIndian.toFixed(2);
  //   this.totalenteredhoursUSAStr = this.totalenteredhoursUSA.toFixed(2);
  //   this.data = new MatTableDataSource(this.durationList);
  //   this.displayedRowData = this.durationList;
  //   this.data.paginator = this.paginator;
  //   this.data.sort = this.sort;
  //   this.loading = false;
  // }

  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  changeStatus(data) {
    this.isModal = true;
    this.selectedSowId = data.projectId;
    this.sowFullName = data.sowId;
    this.countTable.GetSwoAllocation(data.projectId, data.sowId);
  }

}
