import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { DataService } from "src/app/services/data.service";
import { EncryptionService } from "src/app/services/encryption.service";
import { ProductsServiceService } from "src/app/services/products/products-service.service";
import { TicketDetailVM, TicketPutVM } from "../../model/ticketFormVM";
import { HistoryViewMoreRenderer } from "./history-view-more.rendere";
import {Location} from '@angular/common';
@Component({
  selector: "app-detailed-request",
  templateUrl: "./detailed-request.component.html",
  styleUrls: ["./detailed-request.component.css"],
})
export class DetailedRequestComponent implements OnInit {
  id: string = "0";
  EmpId: number = 0;
  isOwnerView: boolean = false;
  RequestStatusList: any[] = [];
  TicketStatusList: any[] = [];
  ticketProperList: any[] = [];
  HistoryList: any[] = [];
  detail: TicketDetailVM = new TicketDetailVM();
  ticketPut: TicketPutVM = new TicketPutVM();

  loading = true;
  data = new MatTableDataSource();
  displayedColumnDefs = [
    {
      field: "ticketStatus",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Status",
      cellRenderer: "ticketStatus",
      sortable: true,
      width: 150,
      cellStyle: { fontWeight: "bold" },
    },
    {
      field: "createdByName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Updated by",
      cellRenderer: "createdByName",
      sortable: true,
      width: 200,
    },
    {
      field: "createdDate",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Date",
      cellRenderer: "createdDate",
      sortable: true,
      width: 200,
    },
    {
      field: "ticketPriority",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Priority",
      cellRenderer: "ticketPriority",
      sortable: true,
      width: 200,
    },
    {
      field: "comments",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Comments",
      cellRenderer: "comments",
      sortable: true,
      width: 550,
      autoHeight:true
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
      headerName: "View More",
      width: 150,
    },
  ];
  frameworkComponents = {
    statusRenderer: HistoryViewMoreRenderer,
  };
  displayedRowData = [];
  allocationEmpId = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedComment = "";
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsServiceService,
    private dataService: DataService,
    private _alert: AlertMessageService,
    private encryptionService: EncryptionService,
    private location: Location
  ) {}

  ngOnInit() {
    let user = localStorage.getItem("USER_SESSION_DETAILS").toString();
    let JsonUser = JSON.parse(user);
    var halfPart = JsonUser.toString().split('"id":')[1].split(",")[0];
    this.EmpId = halfPart;
    const d = this.encryptionService.enCryptEmpID("null");
    this.id = this.encryptionService.deCryptEmpID(
      this.route.snapshot.params["id"] || d
    );
    this.GetProductDropdownValues();
    this.GetProductTicketHistory(this.id);
  }
  GoBack(){
    this.location.back();
  }
  changeStatus(data) {
    this.selectedComment = data.comments;
  }
  closeModal() {
    this.selectedComment = "";
  }
  GetProductTicketHistory(Id) {
    this.productService
      .GetProductTicketHistoryByTicketId(Id)
      .subscribe((res) => {
        console.log(res);
        res.expGoLiveDate = this.changeData(res.expGoLiveDate);
        this.detail = res;
        this.ticketPut.comments = this.detail.comments;
        if (this.detail.expGoLiveDate != null) {
          let tempDate = this.detail.expGoLiveDate.toString().split("-");
          this.ticketPut.expGoLiveDate =
            tempDate[2] + "-" + tempDate[1] + "-" + tempDate[0];
        }
        this.ticketPut.prodDeployed = this.detail.prodDeployed;
        this.ticketPut.requestStatus = this.detail.requestStatus;
        this.ticketPut.ticketId = this.detail.ticketId;
        this.ticketPut.ticketStatus = this.detail.ticketStatus;
        if (this.detail.productOwner == this.EmpId) {
          this.isOwnerView = true;
        } else {
          this.isOwnerView = false;
        }
        this.HistoryList = res.ticketHistory;
        this.HistoryList.filter((data) => {
          data.createdDate = this.changeData(data.createdDate);
          data.productOwnerName = res.productOwnerName;
        });
        console.log(this.HistoryList);
        this.data = new MatTableDataSource(this.HistoryList);
        this.displayedRowData = this.HistoryList;
        // console.log(this.displayedRowData);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        // console.log("chadrna", this.sort);
        this.loading = false;
      });
  }
  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy hh:mm aa");
  }
  GetProductDropdownValues() {
    this.productService.GetProductDropdownValues().subscribe((data) => {
      data.filter((item) => {
        if (item.type == "RequestStatus") {
          this.RequestStatusList = item.values;
        }
        if (item.type == "TicketStatus") {
          this.TicketStatusList = item.values;
        }
        if (item.type == "TicketPriority") {
          this.ticketProperList = item.values;
        }
      });
    });
  }
  Submit() {
    this.ticketPut.ticketId = +this.id;
    console.log(this.ticketPut);
    this.productService.PutPrdReviewTicket(this.ticketPut).subscribe((data) => {
      this._alert.succuss(data);
      window.location.reload();
    });
  }
}
