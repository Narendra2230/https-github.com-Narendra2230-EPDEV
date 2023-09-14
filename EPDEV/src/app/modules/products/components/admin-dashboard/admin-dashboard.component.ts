import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { ProductsServiceService } from "src/app/services/products/products-service.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  TicketList: any[] = [];
  loading = true;
  data = new MatTableDataSource();
  displayedColumnDefs = [
    {
      field: "productID",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Product ID",
      cellRenderer: "productID",
      sortable: true,
      width: 130,
    },
    {
      field: "productName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "IP Project Name",
      cellRenderer: "productName",
      sortable: true,
      width: 200,
    },
    {
      field: "productOwner",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Owned By",
      cellRenderer: "productOwner",
      sortable: true,
      width: 200,
    },
    {
      field: "new",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "New Requests",
      cellRenderer: "new",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "inProgress",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "InProgress",
      cellRenderer: "inProgress",
      sortable: true,
      width: 130,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "live",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Live",
      cellRenderer: "live",
      sortable: true,
      width: 100,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "approve",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Approved",
      cellRenderer: "approve",
      sortable: true,
      width: 130,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "low",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Low",
      cellRenderer: "low",
      sortable: true,
      width: 100,
      cellStyle: { textAlign: "center" },
     },
    {
      field: "medium",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Medium",
      cellRenderer: "medium",
      sortable: true,
      width: 120,
      cellStyle: { textAlign: "center" },
    },
    {
      field: "high",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "High",
      cellRenderer: "high",
      sortable: true,
      width: 100,
      cellStyle: { textAlign: "center" },
    },
  ];

  displayedRowData = [];
  allocationEmpId = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private gridApi;
  constructor(
    private productService: ProductsServiceService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.GetProductAdminDashboard();
  }
  GetProductAdminDashboard() {
    this.productService.GetProductAdminDashboard().subscribe((res) => {
      console.log(res);
      this.TicketList = res;
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
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
}
