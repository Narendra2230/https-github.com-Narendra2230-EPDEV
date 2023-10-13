import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { ProductsServiceService } from "src/app/services/products/products-service.service";
import { ProductRenderer } from "./productRenderer";

@Component({
  selector: "app-product-dashboard",
  templateUrl: "./product-dashboard.component.html",
  styleUrls: ["./product-dashboard.component.css"],
})
export class ProductDashboardComponent implements OnInit {
  productsList: any[] = [];
  loading = true;
  data = new MatTableDataSource();
  displayedColumnDefs = [
    {
      field: "productTicketId",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Request ID",
      cellRenderer: "productTicketId",
      sortable: true,
      width: 150,
    },
    {
      field: "requesterName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Requester Name",
      cellRenderer: "requesterName",
      sortable: true,
      width: 200,
    },
    {
      field: "productName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Product Name",
      cellRenderer: "productName",
      sortable: true,
      width: 200,
    },
    {
      field: "createdDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Request Date",
      cellRenderer: "createdDate",
      sortable: true,
      width: 200,
    },
    {
      field: "productOwnerName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Product Owner",
      cellRenderer: "productOwnerName",
      sortable: true,
      width: 220,
    },

    {
      field: "ticketStatus",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Request Type",
      cellRenderer: "ticketStatus",
      sortable: true,
      width: 220,
    },
    {
      field: "ticketPriority",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Priority",
      cellRenderer: "ticketPriority",
      sortable: true,
      width: 220,
    },
    {
      field: "reviewTypeName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Issue Type",
      cellRenderer: "reviewTypeName",
      sortable: true,
      width: 220,
    },
    {
      field: "summary",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Summary",
      cellRenderer: "summary",
      sortable: true,
      width: 220,
    },
    {
      field: "",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Action",
      width: 160,
    },
  ];
  Live: boolean = false;
  New: boolean = false;
  InProgress: boolean = false;
  Reject: boolean = false;
  Duplicate: boolean = false;
  ProductId: string = "";
  TicketList = [];
  displayedRowData = [];
  allocationEmpId = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  associateName = "";
  frameworkComponents = {
    statusRenderer: ProductRenderer,
  };
  private gridApi;
  constructor(
    private productService: ProductsServiceService,
    private dataService: DataService
  ) {}
  Id: number = 0;

  ngOnInit() {
    let user = localStorage.getItem("USER_SESSION_DETAILS").toString();
    let JsonUser = JSON.parse(user);
    var halfPart = JsonUser.toString().split('"id":')[1].split(",")[0];
    this.Id = halfPart;
    this.GetProductReviewTicketByEmpId(this.Id);
  }

  UpdateTicketList() {
    let res = [];
    if (
      this.Live &&
      this.InProgress &&
      this.New &&
      this.Reject &&
      this.ProductId != ""
    ) {
      this.TicketList.filter((data) => {
        if (
          (data.ticketStatus == "Live" ||
            data.ticketStatus == "InProgress" ||
            data.ticketStatus == "New" ||
            data.ticketStatus == "Reject") &&
          this.ProductId != ""
        ) {
          res.push(data);
        }
      });
    } else if (this.Live && this.InProgress && this.New && this.Reject) {
      this.TicketList.filter((data) => {
        if (
          data.ticketStatus == "Live" ||
          data.ticketStatus == "InProgress" ||
          data.ticketStatus == "New" ||
          data.ticketStatus == "Reject"
        ) {
          res.push(data);
        }
      });
    } else if (this.Live && this.InProgress && this.New) {
      this.TicketList.filter((data) => {
        if (
          data.ticketStatus == "Live" ||
          data.ticketStatus == "InProgress" ||
          data.ticketStatus == "New"
        ) {
          res.push(data);
        }
      });
    } else if (this.Reject && this.InProgress && this.New) {
      this.TicketList.filter((data) => {
        if (
          data.ticketStatus == "Reject" ||
          data.ticketStatus == "InProgress" ||
          data.ticketStatus == "New"
        ) {
          res.push(data);
        }
      });
    } else if (this.ProductId != "" && this.InProgress && this.New) {
      this.TicketList.filter((data) => {
        if (
          data.productID == this.ProductId &&
          (data.ticketStatus == "InProgress" || data.ticketStatus == "New")
        ) {
          res.push(data);
        }
      });
    } else if (this.Reject && this.InProgress && this.Live) {
      this.TicketList.filter((data) => {
        if (
          data.ticketStatus == "Reject" ||
          data.ticketStatus == "InProgress" ||
          data.ticketStatus == "Live"
        ) {
          res.push(data);
        }
      });
    } else if (this.ProductId != "" && this.InProgress && this.Live) {
      this.TicketList.filter((data) => {
        if (
          data.productID == this.ProductId &&
          (data.ticketStatus == "InProgress" || data.ticketStatus == "Live")
        ) {
          res.push(data);
        }
      });
    }
    else if (this.ProductId != "" && this.New && this.Live) {
      this.TicketList.filter((data) => {
        if (
          data.productID == this.ProductId &&
          (data.ticketStatus == "New" || data.ticketStatus == "Live")
        ) {
          res.push(data);
        }
      });
    } else if (this.New && this.InProgress) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "New" || data.ticketStatus == "InProgress") {
          res.push(data);
        }
      });
    } else if (this.Live && this.InProgress) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "Live" || data.ticketStatus == "InProgress") {
          res.push(data);
        }
      });
    } else if (this.Reject && this.InProgress) {
      this.TicketList.filter((data) => {
        if (
          data.ticketStatus == "Reject" ||
          data.ticketStatus == "InProgress"
        ) {
          res.push(data);
        }
      });
    } else if (this.ProductId != "" && this.InProgress) {
      this.TicketList.filter((data) => {
        if (
          data.productID == this.ProductId &&
          data.ticketStatus == "InProgress"
        ) {
          res.push(data);
        }
      });
    } else if (this.Live && this.New) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "Live" || data.ticketStatus == "New") {
          res.push(data);
        }
      });
    } else if (this.Reject && this.New) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "Reject" || data.ticketStatus == "New") {
          res.push(data);
        }
      });
    } else if (this.ProductId != "" && this.New) {
      this.TicketList.filter((data) => {
        if (data.productID == this.ProductId && data.ticketStatus == "New") {
          res.push(data);
        }
      });
      console.log(res);
    } else if (this.Reject && this.Live) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "Reject" || data.ticketStatus == "Live") {
          res.push(data);
        }
      });
    } else if (this.ProductId != "" && this.Live) {
      this.TicketList.filter((data) => {
        if (data.productID == this.ProductId && data.ticketStatus == "Live") {
          res.push(data);
        }
      });
    } else if (this.ProductId != "" && this.Reject) {
      this.TicketList.filter((data) => {
        if (data.productID == this.ProductId && this.Reject) {
          res.push(data);
        }
      });
    }else
    if (this.InProgress) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "InProgress") {
          res.push(data);
        }
      });
    } else if (this.New) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "New") {
          res.push(data);
        }
      });
    } else if (this.Live) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "Live") {
          res.push(data);
        }
      });
    } else if (this.Reject) {
      this.TicketList.filter((data) => {
        if (data.ticketStatus == "Reject") {
          res.push(data);
        }
      });
    } else if (this.ProductId != "") {
      this.TicketList.filter((data) => {
        if (data.productID == this.ProductId) {
          res.push(data);
      console.log(res);
        }
      });
    }
    if (
      !this.New &&
      !this.Live &&
      !this.InProgress &&
      !this.Reject &&
      this.ProductId == ""
    ) {
      res = this.TicketList;
      console.log(res);
    }
    this.data = new MatTableDataSource(res);
    this.displayedRowData = res;
    // console.log(this.displayedRowData);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    // console.log("chadrna", this.sort);
    this.loading = false;
  }
  GetProductReviewTicketByEmpId(Id: number) {
    this.productService.GetProductReviewTicketByEmpId(Id).subscribe((res) => {
      console.log(res);
      res.filter((data) => {
        data.createdDate = this.changeData(data.createdDate);
        let Findex = this.productsList.findIndex((item) => {
          return item.id == data.productID;
        });
        if (Findex == -1) {
          this.productsList.push({
            id: data.productID,
            name: data.productName,
          });
        }
      });
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

  changeStatus(data) {}
  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
}
