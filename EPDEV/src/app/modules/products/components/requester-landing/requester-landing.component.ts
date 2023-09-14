import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { DataService } from "src/app/services/data.service";
import { ProductsServiceService } from "src/app/services/products/products-service.service";
import { TicketFormVM } from "../../model/ticketFormVM";
import { RequestLandingRenderer } from "./requesterlanding-rendere";

@Component({
  selector: "app-requester-landing",
  templateUrl: "./requester-landing.component.html",
  styleUrls: ["./requester-landing.component.css"],
})
export class RequesterLandingComponent implements OnInit {
  todate: Date = new Date();
  userSubmitted: boolean = false;
  ticketFormGroup: FormGroup;
  ticketData: TicketFormVM;
  Id: number = 0;
  AssociateName: string = "";
  productsList: any[] = [];
  ticketProperList: any[] = [];
  typeList: any[] = [];

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
      width: 130,
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
      width: 150,
    },
    {
      field: "productOwnerName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Product Owner",
      cellRenderer: "productOwnerName",
      sortable: true,
      width: 200,
    },

    {
      field: "ticketStatus",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Request Type",
      cellRenderer: "ticketStatus",
      sortable: true,
      width: 180,
    },
    {
      field: "reviewTypeName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Key Ask",
      cellRenderer: "reviewTypeName",
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
      width: 200,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  associateName = "";
  frameworkComponents = {
    statusRenderer: RequestLandingRenderer,
  };
  private gridApi;

  constructor(
    private productService: ProductsServiceService,
    private dataService: DataService,
    private fb: FormBuilder,
    private _alert: AlertMessageService
  ) {}

  ngOnInit() {
    let user = localStorage.getItem("USER_SESSION_DETAILS").toString();
    let JsonUser = JSON.parse(user);
    var halfPart = JsonUser.toString().split('"id":')[1].split(",")[0];
    this.Id = halfPart;
    this.CreateTicketForm();
    this.GetProductDropdownValues();
    this.GetProductReviewTicket(this.Id);
  }
  CreateTicketForm() {
    this.ticketFormGroup = this.fb.group({
      productID: [null, Validators.required],
      reviewTypeName: [null, Validators.required],
      requesterName: [this.AssociateName],
      summary: [null],
      description: [null, Validators.required],
    });
  }
  get productID() {
    return this.ticketFormGroup.get("productID") as FormControl;
  }
  get reviewTypeName() {
    return this.ticketFormGroup.get("reviewTypeName") as FormControl;
  }
  get requesterName() {
    return this.ticketFormGroup.get("requesterName") as FormControl;
  }
  get summary() {
    return this.ticketFormGroup.get("summary") as FormControl;
  }
  get description() {
    return this.ticketFormGroup.get("description") as FormControl;
  }
  TicketData(): TicketFormVM {
    return (this.ticketData = {
      productID: this.productID.value,
      reviewTypeId: this.reviewTypeName.value,
      ticketPriority: '',
      summary: this.summary.value,
      description: this.description.value,
    });
  }

  onSubmit() {
    this.userSubmitted = true;
    if (this.ticketFormGroup.valid) {
      this.productService.PostTicket(this.TicketData()).subscribe((res) => {
        document.getElementById("closeModalButton").click();
        this.GetProductReviewTicket(this.Id);
        this._alert.succuss("Ticket submitted successfully.");
      });
    } else {
      this.userSubmitted = false;
      this._alert.error("Kindly provide the required fields");
    }
  }
  changeStatus(data) {}
  GetProductReviewTicket(Id) {
    this.productService
      .GetProductReviewTicketByRequestId(Id)
      .subscribe((res) => {
        console.log(res);
        res.filter((data) => {
          data.createdDate = this.changeData(data.createdDate);
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

  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
  SortOwner() {
    if (this.productID.value != null) {
      this.productsList.filter((data) => {
        if (data.id == this.productID.value) {
          this.AssociateName = data.child[0].name;
          this.ticketFormGroup.controls['requesterName'].setValue(this.AssociateName);
        }
      });
    }
  }
  GetProductDropdownValues() {
    this.productService.GetProductDropdownValues().subscribe((data) => {
      data.filter((item) => {
        if (item.type == "Products") {
          this.productsList = item.values;
          console.log(this.productsList);
        }
        if (item.type == "ReviewTypes") {
          this.typeList = item.values;
        }
        if (item.type == "TicketPriority") {
          this.ticketProperList = item.values;
        }
      });
    });
  }
}
