import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { ResourceAllocationService } from "src/app/services/resource-allocation/resource-allocation.service";
import { ResourceAllocationModel } from "../../models/ResourceAllocationModel";
import { UtilizationDTO } from "../../models/UtilizationModel";

@Component({
  selector: "app-resource-allocation-by-associate",
  templateUrl: "./resource-allocation-by-associate.component.html",
  styleUrls: ["./resource-allocation-by-associate.component.css"],
})
export class ResourceAllocationByAssociateComponent implements OnInit {
  resourceList: ResourceAllocationModel[] = [];
  resourceList1: ResourceAllocationModel[] = [];
  Status: string = "";
  utilizationList1: UtilizationDTO[] = [];
  utilizationList2: UtilizationDTO[] = [];
  data = new MatTableDataSource();
  loading = true;
  displayedColumnDefs = [
    {
      field: "id",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Id",
      cellRenderer: "id",
      sortable: true,
      width: 100,
    },
    {
      field: "name",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Name",
      cellRenderer: "name",
      sortable: true,
      width: 200,
    },
    {
      field: "company",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Company",
      cellRenderer: "company",
      sortable: true,
      width: 200,
    },
    {
      field: "unit",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Unit",
      cellRenderer: "unit",
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
      width: 250,
    },
    {
      field: "sow",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "SOW",
      cellRenderer: "sow",
      sortable: true,
      width: 250,
    },
    {
      field: "customer",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Customer",
      cellRenderer: "customer",
      sortable: true,
      width: 250,
    },
    {
      field: "employeeType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Type",
      cellRenderer: "employeeType",
      sortable: true,
      width: 250,
    },
    {
      field: "project",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Project",
      cellRenderer: "project",
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
      field: "date_Of_Joining",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Date of joining",
      cellRenderer: "date_Of_Joining",
      sortable: true,
      width: 200,
    },
    {
      field: "primarySkill",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Primary Skill",
      cellRenderer: "primarySkill",
      sortable: true,
      width: 200,
    },
    {
      field: "secondarySkill",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Secondary Skill",
      cellRenderer: "secondarySkill",
      sortable: true,
      width: 200,
    },
    {
      field: "aging",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Aging",
      cellRenderer: "aging",
      sortable: true,
      width: 150,
    },
    {
      field: "status",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Status",
      cellRenderer: "status",
      sortable: true,
      width: 150,
    },
    {
      field: "billability",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Billability",
      cellRenderer: "billability",
      sortable: true,
      width: 150,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  selectedSowId = 0;
  // frameworkComponents = {
  //   statusRenderer: AssociateCountRenderer,
  // };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private gridApi;
  btus = [];
  constructor(
    private allocationService: ResourceAllocationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.GetResourceAllocation();
  }
  datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  formatDate(date) {
    try {
      return this.dataService.dateFormatter(date, "MM/dd/yy");
    } catch (e) {}
    return date;
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  ChangeFilter() {
    switch (this.Status) {
      case "FTA-Bench":
        var searchData = this.resourceList1.filter((data) => {
          return (
            data.employeeType == "FTA" &&
            data.status == "Bench" &&
            data.billability == 100
          );
        });
        this.resourceList = searchData;
        break;
      case "FTA-Partial-Bench":
        var searchData = this.resourceList1.filter((data) => {
          return (
            data.employeeType == "FTA" &&
            data.status == "Bench" &&
            data.billability < 100 &&
            data.billability > 0
          );
        });
        this.resourceList = searchData;
        break;
      case "FTA-No-Allocation-Bench":
        var searchData = this.resourceList1.filter((data) => {
          return (
            data.employeeType == "FTA" &&
            (data.billability == 0 || data.billability == null)
          );
        });
        this.resourceList = searchData;
        break;
      case "Contract-Bench":
        var searchData = this.resourceList1.filter((data) => {
          return (
            data.employeeType != "FTA" &&
            data.status == "Bench" &&
            data.billability == 100
          );
        });
        this.resourceList = searchData;
        break;
      case "Contract-Partial-Bench":
        var searchData = this.resourceList1.filter((data) => {
          return (
            data.employeeType != "FTA" &&
            data.status == "Bench" &&
            data.billability < 100 &&
            data.billability > 0
          );
        });
        this.resourceList = searchData;
        break;
      case "Contract-No-Allocation-Bench":
        var searchData = this.resourceList1.filter((data) => {
          return (
            data.employeeType != "FTA" &&
            (data.billability == 0 || data.billability == null)
          );
        });
        this.resourceList = searchData;
        break;
      default:
        this.resourceList = this.resourceList1;
    }

    this.data = new MatTableDataSource(this.resourceList);
    this.displayedRowData = this.resourceList;
    // console.log(this.displayedRowData);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    // console.log("chadrna", this.sort);
    this.loading = false;
  }
  GetResourceAllocation() {
    this.allocationService.GetResourceAllocations().subscribe((res: any[]) => {
      console.log(res);
      this.btus = [];
      var statuss = [];
      res.filter((item: ResourceAllocationModel) => {
        item.date_Of_Joining = this.formatDate(item.date_Of_Joining);
        if (item.date_Of_Joining == "01/01/01") {
          item.date_Of_Joining=""
        }
        item.startDate = this.formatDate(item.startDate);
        if (item.startDate != "01/01/01") {
          var tempSTDate = new Date(item.startDate);
          item.aging = this.datediff(tempSTDate, new Date()) + "Days";
        } else {
          item.startDate = "";
          item.aging = "";
        }
        item.endDate = this.formatDate(item.endDate);
        if(item.endDate=="01/01/01"){
          item.endDate='';
        }
        if (item.btu != null) {
          var btuFindIndex = this.btus.findIndex((data) => data == item.btu);
          if (btuFindIndex == -1) {
            this.btus.push(item.btu);
          }
          var statusFindIndex = statuss.findIndex(
            (data) => data == item.status
          );
          if (statusFindIndex == -1) {
            statuss.push(item.status);
          }
        }
      });
      // console.log(this.btus);
      //FTA Calculation
      statuss.filter((status) => {
        var item = [];
        this.btus.filter((btu) => {
          var btuFTA = res.filter((item: ResourceAllocationModel) => {
            return (
              item.employeeType == "FTA" &&
              item.btu == btu &&
              item.status == status
            );
          });
          item.push({ values: btuFTA.length, btu: btu });
        });
        this.utilizationList1.push({
          ftastatus: status,
          items: item,
        });
      });
      var totalItem = [];
      this.btus.filter((btu) => {
        var btuFTA = res.filter((item: ResourceAllocationModel) => {
          return item.employeeType == "FTA" && item.btu == btu;
        });
        totalItem.push({ values: btuFTA.length, btu: btu });
      });
      this.utilizationList1.push({
        ftastatus: "Total",
        items: totalItem,
      });
      //FTA Calculation End

      //Contractor Calculation
      console.log(statuss);
      statuss.filter((status) => {
        var item = [];
        this.btus.filter((btu) => {
          var btuFTA = res.filter((item: ResourceAllocationModel) => {
            return (
              item.employeeType != "FTA" &&
              item.btu == btu &&
              item.status == status
            );
          });
          item.push({ values: btuFTA.length, btu: btu });
        });
        this.utilizationList2.push({
          ftastatus: status,
          items: item,
        });
      });
      var totalItem = [];
      this.btus.filter((btu) => {
        var btuFTA = res.filter((item: ResourceAllocationModel) => {
          return item.employeeType != "FTA" && item.btu == btu;
        });
        totalItem.push({ values: btuFTA.length, btu: btu });
      });
      this.utilizationList2.push({
        ftastatus: "Total",
        items: totalItem,
      });
      //FTA Contractor End

      this.resourceList = res;
      this.resourceList1 = res;
      this.data = new MatTableDataSource(res);
      this.displayedRowData = res;
      //console.log(this.displayedRowData);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      //console.log("chadrna", this.sort);
      this.loading = false;
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }

  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
}
