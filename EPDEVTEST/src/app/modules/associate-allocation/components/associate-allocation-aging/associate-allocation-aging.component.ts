import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AssociateAllocationService } from "src/app/services/associate-allocation/associate-allocation.service";
import { DataService } from "src/app/services/data.service";
import { ExportExcelService } from "src/app/services/export-excel/export-excel.service";

@Component({
  selector: "app-associate-allocation-aging",
  templateUrl: "./associate-allocation-aging.component.html",
  styleUrls: ["./associate-allocation-aging.component.css"],
})
export class AssociateAllocationAgingComponent implements OnInit {
  data = new MatTableDataSource();
  loading = false;
  displayedColumnDefs = [
    {
      field: "employeeID",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Associate ID",
      cellRenderer: "employeeID",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "employeeName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Associate Name",
      cellRenderer: "employeeName",
      sortable: true,
      width: 150,
    },
    {
      field: "employmentType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Type",
      cellRenderer: "employmentType",
      sortable: true,
      width: 150,
    },
    {
      field: "btu",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "BTU",
      cellRenderer: "btu",
      sortable: true,
      width: 100,
    },
    {
      field: "sow",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW",
      cellRenderer: "sow",
      sortable: true,
      width: 150,
    },
    {
      field: "billingType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Billing Type",
      cellRenderer: "billingType",
      sortable: true,
      width: 150,
    },
    {
      field: "allocationPer",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Allocation %",
      cellRenderer: "allocationPer",
      sortable: true,
      width: 150,
    },
    {
      field: "allocationStartDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Start Date",
      cellRenderer: "allocationStartDate",
      sortable: true,
      width: 200,
    },

    {
      field: "allocationEndDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "End Date",
      cellRenderer: "allocationEndDate",
      sortable: true,
      width: 200,
    },
    {
      field: "aging",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Ageing (Days)",
      cellRenderer: "aging",
      sortable: true,
      width: 120,
    },
    {
      field: "bracket",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Bracket",
      cellRenderer: "bracket",
      sortable: true,
      width: 120,
    },
    {
      field: "status",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Status",
      cellRenderer: "status",
      sortable: true,
      width: 120,
    },
    {
      field: "organizationName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Organization",
      cellRenderer: "organizationName",
      sortable: true,
      width: 200,
    },
    {
      field: "doj",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Date of Joining",
      cellRenderer: "doj",
      sortable: true,
      width: 170,
    },
    {
      field: "primarySkill",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Primary Skill",
      cellRenderer: "primarySkill",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "secondarySkill",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Secondary Skill",
      cellRenderer: "secondarySkill",
      sortable: true,
      width: 180,
      cellStyle: { textAlign: "center" },
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private gridApi;
  allocationList = [];
  allocationList1 = [];
  StartDate: any;
  EndDate: any;
  constructor(
    private dataService: DataService,
    private allocationService: AssociateAllocationService,
    public ete: ExportExcelService
  ) {}

  ngOnInit() {}
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }

  GetAgings() {
    if (this.StartDate != undefined && this.EndDate != undefined) {
      this.loading = true;
      this.allocationService
        .GetAssociateAllocationAging(this.StartDate, this.EndDate)
        .subscribe((res: any[]) => {
          res.filter((data) => {
            let startDate = new Date(data.allocationStartDate);
            let EndDate = new Date(data.allocationEndDate);

            var Difference_In_Time = EndDate.getTime() - startDate.getTime();

            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            data.aging = Difference_In_Days;

            if (data.aging <= 30) {
              data.bracket = "0-30 Days";
            } else if (data.aging <= 60) {
              data.bracket = "30-60 Days";
            } else if (data.aging <= 90) {
              data.bracket = "60-90 Days";
            } else if (data.aging <= 120) {
              data.bracket = "90-120 Days";
            } else if (data.aging <= 180) {
              data.bracket = "120-180 Days";
            } else if (data.aging <= 365) {
              data.bracket = "180-365 Days";
            } else if (data.aging > 365) {
              data.bracket = "< 365 Days";
            }
            if (
              data.billingType == "Billing" ||
              data.billingType == "IP/POC" ||
              data.billingType == "Platform Development" ||
              data.billingType == "Intra Transfer"
            ) {
              data.status = "Productive";
              data.aging = 0;
            } else if (
              data.billingType == "Work Ahead efforts" ||
              data.billingType == "Non Billable" ||
              data.billingType == "Support Services"
            ) {
              data.status = "Available";
            }

            data.allocationEndDate = this.changeData(data.allocationEndDate);
            data.allocationStartDate = this.changeData(
              data.allocationStartDate
            );
            data.doj = this.changeData(data.doj);
          });
          console.log(res);
          this.allocationList = res;
          this.allocationList1 = res;
          this.data = new MatTableDataSource(res);
          this.displayedRowData = res;
          // console.log(this.displayedRowData);
          this.data.paginator = this.paginator;
          this.data.sort = this.sort;
          // console.log("chadrna", this.sort);
          this.loading = false;
        });
    }
  }

  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
}
