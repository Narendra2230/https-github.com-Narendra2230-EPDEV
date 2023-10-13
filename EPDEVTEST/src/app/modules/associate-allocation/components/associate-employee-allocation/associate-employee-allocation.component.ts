import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AssociateAllocationService } from 'src/app/services/associate-allocation/associate-allocation.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-associate-employee-allocation',
  templateUrl: './associate-employee-allocation.component.html',
  styleUrls: ['./associate-employee-allocation.component.css']
})
export class AssociateEmployeeAllocationComponent implements OnInit {

  @Input() EmpId: number = 0;
  loading = true;
  data = new MatTableDataSource();
  displayedColumnDefs = [
    {
      field: "sowName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW Name",
      cellRenderer: "sowName",
      sortable: true,
      width: 150,
    },
    {
      field: "percentBillable",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Percent Billable",
      cellRenderer: "percentBillable",
      sortable: true,
      width: 200,
    },
    {
      field: "startDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Start Date",
      cellRenderer: "startDate",
      sortable: true,
      width: 200,
    },
    {
      field: "endDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "End Date",
      cellRenderer: "endDate",
      sortable: true,
      width: 200,
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
    {
      field: "Ageing",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Ageing",
      cellRenderer: "Ageing",
      sortable: true,
      width: 240,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  associateName='';
  private gridApi;
  constructor(
    private allocationService:AssociateAllocationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.GetSwoAllocation(this.EmpId,this.associateName);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }

  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
  GetSwoAllocation(EmpId,associateName) {
    this.associateName=associateName;
    console.log(EmpId)
    this.allocationService
      .GetAssociateEmpAllocation(EmpId)
      .subscribe((res: any[]) => {
        res.filter((data) => {
          let date = this.changeData(data.startDate);
          data.startDate = date;
          let stdate = this.changeData(data.endDate);
          data.endDate = stdate;
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
