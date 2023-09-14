import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { AllocationService } from "src/app/services/sow-allocation/allocation.service";

@Component({
  selector: "app-associate-count-table",
  templateUrl: "./associate-count-table.component.html",
  styleUrls: ["./associate-count-table.component.css"],
})
export class AssociateCountTableComponent implements OnInit {
  @Input() sowid: number = 0;
  loading = true;
  data = new MatTableDataSource();
  displayedColumnDefs = [
    {
      field: "employeeID",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "EmpId",
      cellRenderer: "employeeID",
      sortable: true,
      width: 150,
    },
    {
      field: "empName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Emp Name",
      cellRenderer: "empName",
      sortable: true,
      width: 200,
    },
    {
      field: "percentBillable",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Allocation %",
      cellRenderer: "percentBillable",
      sortable: true,
      width: 200,
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
      width: 220,
    },

    {
      field: "level1Approver",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "L1 Approver",
      cellRenderer: "level1Approver",
      sortable: true,
      width: 220,
    },
    {
      field: "level2Approver",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "L2 Approver",
      cellRenderer: "level2Approver",
      sortable: true,
      width: 240,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sowName='';
  private gridApi;
  constructor(
    private allocationService: AllocationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.GetSwoAllocation(this.sowid,this.sowName);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }

  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
  GetSwoAllocation(sowId,sowName) {
    this.sowName=sowName;
    this.allocationService
      .GetSwoEmployee(sowId)
      .subscribe((res: any[]) => {
        res.filter((data) => {
          let date = this.changeData(data.allocationEndDate);
          data.allocationEndDate = date;
          let stdate = this.changeData(data.allocationStartDate);
          data.allocationStartDate = stdate;
        });

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
