import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { StatusRenderer } from "src/app/modules/profile/screens/hr-associates/hr-associate-status-renderer";
import { DataService } from "src/app/services/data.service";
import { AllocationService } from "src/app/services/sow-allocation/allocation.service";
import { SowallocationVm } from "../../model/sowallocation";
import { AssociateCountTableComponent } from "../associate-count-table/associate-count-table.component";
import { AssociateCountRenderer } from "./associate-count-renderer";

@Component({
  selector: "app-allocation-page",
  templateUrl: "./allocation-page.component.html",
  styleUrls: ["./allocation-page.component.css"],
})
export class AllocationPageComponent implements OnInit {
  @ViewChild(AssociateCountTableComponent, { static: true })
  countTable: AssociateCountTableComponent;
  sowAllocationList: SowallocationVm[] = [];
  sowAllocationList1: SowallocationVm[] = [];
  isModal: boolean = false;
  data = new MatTableDataSource();
  loading = true;
  Status: string = "";
  totalSows: number = 0;
  totalBillable: number = 0;
  totalHeadcount: number = 0;
  totalSOWValues: number = 0;
  totalSOWValuesStr: string='';
  totalEndDate: number = 0;
  totalZeroRevenew: number = 0;
  displayedColumnDefs = [
    {
      field: "customerName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Customer Name",
      cellRenderer: "customerName",
      sortable: true,
      width: 180,
    },
    {
      field: "csu",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "CSU",
      cellRenderer: "CSU",
      sortable: true,
      width: 100,
    },

    {
      field: "btuName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "BTU",
      cellRenderer: "btuName",
      sortable: true,
      width: 100,
    },

    {
      field: "competency",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Practice",
      cellRenderer: "competency",
      sortable: true,
      width: 120,
    },

    {
      field: "sowName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW ID",
      cellRenderer: "sowName",
      sortable: true,
      width: 220,
    },
    {
      field: "sowFullName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Name",
      cellRenderer: "sowFullName",
      sortable: true,
      width: 240,
    },

    {
      field: "empCount",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "AssociateCount",
      cellStyle: { textAlign: "center" },
      width: 160,
    },

    {
      field: "sowValue",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Value",
      cellRenderer: "sowValue",
      sortable: true,
      width: 140,
    },

    {
      field: "allocationtypeofSOW",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Type",
      cellRenderer: "allocationtypeofSOW",
      sortable: true,
      width: 150,
    },

    {
      field: "sowManager",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Manager",
      cellRenderer: "sowManager",
      sortable: true,
      width: 160,
    },

    {
      field: "projectManager",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Project Manager",
      cellRenderer: "projectManager",
      sortable: true,
      width: 160,
    },

    {
      field: "deliveryLead",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Delivery Lead",
      cellRenderer: "deliveryLead",
      sortable: true,
      width: 160,
    },
    {
      field: "deliveryHead",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Delivery Head",
      cellRenderer: "deliveryHead",
      sortable: true,
      width: 180,
    },

    {
      field: "sowStartDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Start Date",
      cellRenderer: "sowStartDate",
      sortable: true,
      width: 150,
    },
    {
      field: "sowEndDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW End Date",
      cellRenderer: "sowEndDate",
      sortable: true,
      width: 150,
    },

    {
      field: "sowDescription",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "RevenueType",
      cellRenderer: "sowDescription",
      sortable: true,
      width: 150,
    },
  
    {
      field: "projectType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Project Type",
      cellRenderer: "projectType",
      sortable: true,
      width: 150,
    },
    {
      field: "projectOwner",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Project Owner",
      cellRenderer: "projectOwner",
      sortable: true,
      width: 150,
    },

    {
      field: "hrbp",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "HRBP",
      cellRenderer: "hrbp",
      sortable: true,
      width: 120,
    },
    {
      field: "financeBP",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "FinanceBP",
      cellRenderer: "financeBP",
      sortable: true,
      width: 150,
    },

    {
      field: "billingUnit",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Billing Unit",
      cellRenderer: "billingUnit",
      sortable: true,
      width: 120,
    },

    {
      field: "sowType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Type",
      cellRenderer: "sowType",
      sortable: true,
      width: 140,
    },

    {
      field: "sowid",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Id",
      cellRenderer: "sowid",
      sortable: true,
      width: 120,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  selectedSowId = 0;
  frameworkComponents = {
    statusRenderer: AssociateCountRenderer,
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sowFullName = "";
  private gridApi;
  constructor(
    private allocationService: AllocationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.GetSwoAllocation();
  }

  ChangeFilter() {
    switch (this.Status) {
      case "Billable":
        let searchData = this.sowAllocationList1.filter((data) => {
          return data.allocationtypeofSOW == "Billable";
        });
        this.sowAllocationList = searchData;
        break;
      case "Non-Billable":
        let searchData1 = this.sowAllocationList1.filter((data) => {
          return data.allocationtypeofSOW == this.Status;
        });
        this.sowAllocationList = searchData1;
        break;
      case "EndPassed":
        let searchData2 = this.sowAllocationList1.filter((data) => {
          let todate = new Date();
          var tempDate = data.sowEndDate.split("-");
          var endate = tempDate[1] + "-" + tempDate[0] + "-" + tempDate[2];
          let endDate = new Date(endate);
          return endDate < todate;
        });
        this.sowAllocationList = searchData2;
        break;
      case "ZeroEmpCount":
        let searchData3 = this.sowAllocationList1.filter((data) => {
          return data.empCount == 0;
        });
        this.sowAllocationList = searchData3;
        break;
        case "ZeroSOWCount":
          let searchData5 = this.sowAllocationList1.filter((data) => {
            return data.sowValue == 0;
          });
          this.sowAllocationList = searchData5;
          break;

      case "EAM":
      case "ICT":
      case "DIA":
      case "DAM":
      case "DTI":
      case "SSU":
        let searchData4 = this.sowAllocationList1.filter((data) => {
          return data.btuName == this.Status;
        });
        this.sowAllocationList = searchData4;
        break;
      default:
        this.sowAllocationList = this.sowAllocationList1;
    }
    this.totalBillable = 0;
    this.totalHeadcount = 0;
    this.totalSOWValues = 0;
    this.totalEndDate = 0;
    this.totalZeroRevenew = 0;
    this.sowAllocationList.filter((data) => {
      if (data.allocationtypeofSOW == "Billable") {
        this.totalBillable = this.totalBillable + 1;
      }
      this.totalHeadcount = this.totalHeadcount + data.empCount;
      if (data.sowValue == 0) {
        this.totalZeroRevenew = this.totalZeroRevenew + 1;
      }
      this.totalSOWValues = this.totalSOWValues + data.sowValue;
      let todate = new Date();
      var tempDate = data.sowEndDate.split("-");
      var endate = tempDate[1] + "-" + tempDate[0] + "-" + tempDate[2];
      let endDate = new Date(endate);
      if (endDate < todate) {
        this.totalEndDate = this.totalEndDate + 1;
      }
      data.sowEndDate = data.sowEndDate;
      data.sowStartDate = data.sowStartDate;
    });

    this.totalSOWValuesStr =this.totalSOWValues.toLocaleString();
    this.totalSows = this.sowAllocationList.length;
    this.data = new MatTableDataSource(this.sowAllocationList);
    this.displayedRowData = this.sowAllocationList;
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    this.loading = false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
  changeStatus(data) {
    this.isModal = true;
    this.selectedSowId = data.sowid;
    this.sowFullName = data.sowFullName;
    this.countTable.GetSwoAllocation(data.sowid, data.sowFullName);
  }

  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }

  GetSwoAllocation() {
    this.allocationService.GetSwoAllocation().subscribe((res: any[]) => {
      res.filter((data) => {

        if (data.allocationtypeofSOW == "Billable") {
          this.totalBillable = this.totalBillable + 1;
        }
        this.totalHeadcount = this.totalHeadcount + data.empCount;
        if (data.sowValue == 0) {
          this.totalZeroRevenew = this.totalZeroRevenew + 1;
        }
        this.totalSOWValues = this.totalSOWValues + data.sowValue;

        data.sowValue=data.sowValue;
        let todate = new Date();
        let endDate = new Date(data.sowEndDate);
        if (endDate < todate) {
          this.totalEndDate = this.totalEndDate + 1;
        }
        let date = this.changeData(data.sowEndDate);
        data.sowEndDate = date;
        let stdate = this.changeData(data.sowStartDate);
        data.sowStartDate = stdate;
      });
      this.totalSOWValuesStr =this.totalSOWValues.toLocaleString();
      this.sowAllocationList = res;
      this.totalSows = this.sowAllocationList.length;
      this.sowAllocationList1 = res;
      console.log(this.sowAllocationList);
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
}
