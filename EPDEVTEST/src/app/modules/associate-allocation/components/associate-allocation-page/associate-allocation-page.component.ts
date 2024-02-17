import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AssociateAllocationService } from "src/app/services/associate-allocation/associate-allocation.service";
import { DataService } from "src/app/services/data.service";
import { ExportExcelService } from "src/app/services/export-excel/export-excel.service";
import { BTUModel, GoverningDTO } from "../../models/BTUmodel";
import { AssociateEmployeeAllocationComponent } from "../associate-employee-allocation/associate-employee-allocation.component";
import { AssociateAllocationRenderer } from "./associate-allocation-renderer";
import { AssociateResumePathRenderer } from "./associate-resume-path-renderer";
import * as XLSX from "xlsx";

// import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: "app-associate-allocation-page",
  templateUrl: "./associate-allocation-page.component.html",
  styleUrls: ["./associate-allocation-page.component.css"],
})
export class AssociateAllocationPageComponent implements OnInit {
  @ViewChild(AssociateEmployeeAllocationComponent, { static: true })
  associateEmployee: AssociateEmployeeAllocationComponent;
  btuList: BTUModel[] = [];
  governingList: GoverningDTO[] = [];
  governingList1 = [];
  governingList2 = [];
  isModal: boolean = false;
  isGoverningItems: boolean = false;
  data = new MatTableDataSource();
  loading = true;
  Status: string = "";
  totalFullAllocation: number = 0;
  totalPartialAllocation: number = 0;
  totalZeroAllocation: number = 0;
  totalAllocation: number = 0;
  displayedColumnDefs = [
    {
      field: "employeeID",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Associate ID",
      cellRenderer: "employeeID",
      sortable: true,
      width: 100,
    },
    {
      field: "associateName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Associate Name",
      cellRenderer: "associateName",
      sortable: true,
      width: 200,
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
      field: "governingUnitName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Governing Unit Name",
      cellRenderer: "governingUnitName",
      sortable: true,
      width: 150,
    },

    {
      field: "employmentType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Emp Type",
      cellRenderer: "employmentType",
      sortable: true,
      width: 100,
    },

    {
      field: "overallAllocationPercent",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Overall Allocation % ",
      cellStyle: { textAlign: "center" },
      width: 200,
    },

    {
      field: "billablePercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Billable %",
      cellRenderer: "billablePercent",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "ippocPercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "IP POC %",
      cellRenderer: "ippocPercent",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "supportServicesPercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Support Services %",
      cellRenderer: "supportServicesPercent",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "salesMarketPercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Sales Market %",
      cellRenderer: "salesMarketPercent",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "nonBillablePercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Non Billable %",
      cellRenderer: "nonBillablePercent",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "intraDevPercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Intra Dev %",
      cellRenderer: "intraDevPercent",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "workHeadPercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Work Ahead %",
      cellRenderer: "workHeadPercent",
      sortable: true,
      width: 150,
      cellStyle: { textAlign: "center" },
    },

    {
      field: "availablepercent",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Available FTE %",
      cellRenderer: "availablepercent",
      sortable: true,
      width: 180,
      cellStyle: { color: "#333", "font-weight": "bold", textAlign: "center" },
    },

    {
      field: "ela1",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "ELAs",
      cellRenderer: "ela1",
      sortable: true,
      width: 120,
    },

    {
      field: "ml1",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "ML",
      cellRenderer: "ml1",
      sortable: true,
      width: 120,
    },
    {
      field: "enablingTeam1",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Enabling Team ",
      cellRenderer: "enablingTeam1",
      sortable: true,
      width: 180,
    },

    {
      field: "fullBench",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Full Bench",
      cellRenderer: "fullBench",
      sortable: true,
      width: 150,
    },

    {
      field: "partialBench",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Partial Bench",
      cellRenderer: "partialBench",
      sortable: true,
      width: 150,
    },

    {
      field: "reportingManager",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Reporting Manager",
      cellRenderer: "reportingManager",
      sortable: true,
      width: 150,
    },
    {
      field: "location",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Location",
      cellRenderer: "location",
      sortable: true,
      width: 100,
    },

    {
      field: "experience",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Experience",
      cellRenderer: "experience",
      sortable: true,
      width: 120,
    },
    {
      field: "designation",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Designation",
      cellRenderer: "designation",
      sortable: true,
      width: 140,
    },
    {
      field: "date_Of_Joining1",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "DOJ",
      cellRenderer: "date_Of_Joining1",
      sortable: true,
      width: 140,
    },
    {
      field: "days",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Days",
      cellRenderer: "days",
      sortable: true,
      width: 140,
    },
    {
      field: "primarySkill",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Primary Skill",
      cellRenderer: "primarySkill",
      sortable: true,
      width: 140,
    },
    {
      field: "secondarySkill",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Secondary Skill",
      cellRenderer: "secondarySkill",
      sortable: true,
      width: 140,
    },
    {
      field: "hrbp",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "HRBP",
      cellRenderer: "hrbp",
      sortable: true,
      width: 140,
    },

    {
      field: "resumePath",
      cellRenderer: "statusRenderer1",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Resume Path ",
      cellStyle: { textAlign: "center" },
      width: 200,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  selectedSowId = 0;
  frameworkComponents = {
    statusRenderer: AssociateAllocationRenderer,
    statusRenderer1: AssociateResumePathRenderer,
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sowFullName = "";
  dividnumber = 90;
  private gridApi;
  allocationList = [];
  allocationList1 = [];
  title = "angular-export-to-excel";

  dataForExcel = [];

  constructor(
    private dataService: DataService,
    private allocationService: AssociateAllocationService,
    public ete: ExportExcelService
  ) {}
  exportToExcel() {
    // this.governingList.forEach((row: any) => {
    //   this.dataForExcel.push(Object.values(row));
    // });

    // let reportData = {
    //   title: "Associate Allocation Utilization",
    //   data: this.dataForExcel,
    //   headers: Object.keys(this.governingList[0]),
    // };

    // this.ete.exportExcel(reportData);

    let element = document.getElementById("export-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Associate-allocation");

    XLSX.writeFile(wb, "associate-allocation.xlsx");
  }
  ngOnInit() {
    this.GetSwoAllocation();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }

  ChangeFilter() {
    // this.totalFullAllocation = 0;
    // this.totalPartialAllocation = 0;
    // this.totalZeroAllocation = 0;
    // switch (this.Status) {
    //   case "Full-Allocation":
    //     let searchData = this.allocationList1.filter((data) => {
    //       return data.overallAllocationPercent == 100;
    //     });
    //     this.totalFullAllocation = searchData.length;
    //     this.allocationList = searchData;
    //     break;
    //   case "Partial-Allocation":
    //     let searchData1 = this.allocationList1.filter((data) => {
    //       return (
    //         data.overallAllocationPercent < 100 &&
    //         data.overallAllocationPercent > 0
    //       );
    //     });
    //     this.totalPartialAllocation = searchData1.length;
    //     this.allocationList = searchData1;
    //     break;
    //   case "No-Allocation":
    //     let searchData2 = this.allocationList1.filter((data) => {
    //       return (
    //         data.overallAllocationPercent == 0 ||
    //         data.overallAllocationPercent == null
    //       );
    //     });
    //     this.totalZeroAllocation = searchData2.length;
    //     this.allocationList = searchData2;
    //     break;
    //   default:
    //     this.allocationList = this.allocationList1;
    //     this.allocationList.filter((data) => {
    //       if (data.overallAllocationPercent == 100) {
    //         this.totalFullAllocation = this.totalFullAllocation + 1;
    //       } else if (
    //         data.overallAllocationPercent < 100 &&
    //         data.overallAllocationPercent > 0
    //       ) {
    //         this.totalPartialAllocation = this.totalPartialAllocation + 1;
    //       } else if (data.overallAllocationPercent == 0) {
    //         this.totalZeroAllocation = this.totalZeroAllocation + 1;
    //       }
    //     });
    // }
    if (this.Status != "") {
      var searchData = this.allocationList1.filter((data) => {
        return data.governingUnitName == this.Status;
      });
      this.allocationList = searchData;
      console.log(searchData);
    } else {
      this.allocationList = this.allocationList1;
    }
    this.data = new MatTableDataSource(this.allocationList);
    this.displayedRowData = this.allocationList;
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    this.loading = false;
  }
  changeStatus(data) {
    this.isModal = true;
    this.selectedSowId = data.empid;
    this.sowFullName = data.associateName;
    this.associateEmployee.GetSwoAllocation(data.empid, data.associateName);
  }
  GetSwoAllocation() {
    if (this.dividnumber != null) {
      this.loading = true;
      this.allocationService
        .GetAssociateAllocation()
        .subscribe((res: any[]) => {
          var designationList = [];
          res.filter((data) => {
            if (data.overallAllocationPercent == null) {
              data.overallAllocationPercent = 0;
            }
            var findex = this.governingList1.filter((item) => {
              return item == data.governingUnitName;
            });
            if (findex.length == 0) {
              this.governingList1.push(data.governingUnitName);
              this.governingList2.push({
                status: true,
                text: data.governingUnitName,
              });
            }
            var findex = designationList.filter((item) => {
              return item == data.designation;
            });
            if (findex.length == 0) {
              designationList.push(data.designation);
            }
            var availablepercent = 100;
            if (data.billablePercent > 0) {
              availablepercent = availablepercent - data.billablePercent;
            }
            if (data.ippocPercent > 0) {
              availablepercent = availablepercent - data.ippocPercent;
            }
            data.availablepercent = availablepercent;
            let minusAvailPercent = data.availablepercent;
            var first = new Date(data.date_Of_Joining);
            var second = new Date();
            var Difference_In_Time = second.getTime() - first.getTime();
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            var RemainingDays = Math.round(Difference_In_Days);
            data.date_Of_Joining1 = this.changeData(data.date_Of_Joining);
            data.days = RemainingDays;
            if (data.ela) {
              data.ela1 = data.availablepercent;
              minusAvailPercent = minusAvailPercent - data.availablepercent;
            } else {
              if (
                data.designation == "Engineer - Trainee" ||
                data.designation == "Executive - Trainee"
              ) {
                if (RemainingDays <= this.dividnumber) {
                  console.log(Math.round(Difference_In_Days));
                  data.ela1 = data.availablepercent;
                  minusAvailPercent = minusAvailPercent - data.availablepercent;
                } else {
                  data.ela1 = "";
                }
              } else {
                data.ela1 = "";
              }
            }
            if (data.ml) {
              data.ml1 = data.availablepercent;
              minusAvailPercent = minusAvailPercent - data.availablepercent;
            } else {
              data.ml1 = "";
            }
            if (data.enablingTeam) {
              minusAvailPercent = minusAvailPercent - data.availablepercent;
              data.enablingTeam1 = data.availablepercent;
            } else {
              data.enablingTeam1 = "";
            }
            if (minusAvailPercent > 99) {
              data.fullBench = data.availablepercent;
            } else {
              if (minusAvailPercent < 0) {
                data.partialBench = 0;
              } else {
                data.partialBench = minusAvailPercent;
              }
            }
          });
          var ssu = res.filter((ssu) => {
            return ssu.btu == "SSU";
          });
          var ssuNoAllocated = ssu.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var ssuAllocated = ssu.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var ssuFTA = ssu.filter((fta) => {
            return fta.employmentType == "FTA";
          });
          var ssuFTANoAllocated = ssuFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var ssuFTAAllocated = ssuFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var ssuNoFTA = ssu.filter((fta) => {
            return fta.employmentType != "FTA";
          });

          var ssuNoFTANoAllocated = ssuNoFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var ssuNoFTAAllocated = ssuNoFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });
          this.btuList.push({
            name: "SSU",
            totalResource: ssu.length,
            totalAllocated: ssuAllocated.length,
            allocatedPercent: (
              (ssuAllocated.length / ssu.length) *
              100
            ).toFixed(2),
            totalNoAllocated: ssuNoAllocated.length,
            fta: ssuFTA.length,
            ftaAllocated: ssuFTAAllocated.length,
            ftaNoAllocated: ssuFTANoAllocated.length,
            contract: ssuNoFTA.length,
            contractAllocated: ssuNoFTAAllocated.length,
            contractNoAllocated: ssuNoFTANoAllocated.length,
          });

          var dam = res.filter((dam) => {
            return dam.btu == "DAM";
          });
          var damNoAllocated = dam.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var damAllocated = dam.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var damFTA = dam.filter((fta) => {
            return fta.employmentType == "FTA";
          });

          var damFTANoAllocated = damFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var damFTAAllocated = damFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var damNoFTA = dam.filter((fta) => {
            return fta.employmentType != "FTA";
          });

          var damNoFTANoAllocated = damNoFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var damNoFTAAllocated = damNoFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });
          this.btuList.push({
            name: "DAM",
            totalResource: dam.length,
            totalAllocated: damAllocated.length,
            allocatedPercent: (
              (damAllocated.length / dam.length) *
              100
            ).toFixed(2),
            totalNoAllocated: damNoAllocated.length,
            fta: damFTA.length,
            ftaAllocated: damFTAAllocated.length,
            ftaNoAllocated: damFTANoAllocated.length,
            contract: damNoFTA.length,
            contractAllocated: damNoFTAAllocated.length,
            contractNoAllocated: damNoFTANoAllocated.length,
          });

          var DIA = res.filter((DIA) => {
            return DIA.btu == "DIA";
          });
          var DIANoAllocated = DIA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var DIAAllocated = DIA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });
          var DIAFTA = DIA.filter((fta) => {
            return fta.employmentType == "FTA";
          });
          var DIAFTANoAllocated = DIAFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var DIAFTAAllocated = DIAFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var DIANoFTA = DIA.filter((fta) => {
            return fta.employmentType != "FTA";
          });
          var DIANoFTANoAllocated = DIANoFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var DIANoFTAAllocated = DIANoFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });
          this.btuList.push({
            name: "DIA",
            totalResource: DIA.length,
            totalAllocated: DIAAllocated.length,
            allocatedPercent: (
              (DIAAllocated.length / DIA.length) *
              100
            ).toFixed(2),
            totalNoAllocated: DIANoAllocated.length,
            fta: DIAFTA.length,
            ftaAllocated: DIAFTAAllocated.length,
            ftaNoAllocated: DIAFTANoAllocated.length,
            contract: DIANoFTA.length,
            contractAllocated: DIANoFTAAllocated.length,
            contractNoAllocated: DIANoFTANoAllocated.length,
          });

          var DTI = res.filter((DTI) => {
            return DTI.btu == "DTI";
          });
          var DTINoAllocated = DTI.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var DTIAllocated = DTI.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var DTIFTA = DTI.filter((fta) => {
            return fta.employmentType == "FTA";
          });
          var DTIFTANoAllocated = DTIFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var DTIFTAAllocated = DTIFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var DTINoFTA = DTI.filter((fta) => {
            return fta.employmentType != "FTA";
          });
          var DTINoFTAAllocated = DTINoFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });
          var DTINoFTANoAllocated = DTINoFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          this.btuList.push({
            name: "DTI",
            totalResource: DTI.length,
            totalAllocated: DTIAllocated.length,
            allocatedPercent: (
              (DTIAllocated.length / DTI.length) *
              100
            ).toFixed(2),
            totalNoAllocated: DTINoAllocated.length,
            fta: DTIFTA.length,
            ftaAllocated: DTIFTAAllocated.length,
            ftaNoAllocated: DTIFTANoAllocated.length,
            contract: DTINoFTA.length,
            contractAllocated: DTINoFTAAllocated.length,
            contractNoAllocated: DTINoFTANoAllocated.length,
          });

          var EAM = res.filter((EAM) => {
            return EAM.btu == "EAM";
          });
          var EAMNoAllocated = EAM.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var EAMAllocated = EAM.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var EAMFTA = EAM.filter((fta) => {
            return fta.employmentType == "FTA";
          });
          var EAMFTANoAllocated = EAMFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var EAMFTAAllocated = EAMFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var EAMNoFTA = EAM.filter((fta) => {
            return fta.employmentType != "FTA";
          });
          var EAMNoFTAAllocated = EAM.filter((fta) => {
            return fta.overallAllocationPercent == 100;
          });
          var EAMNoFTANoAllocated = EAMNoFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          this.btuList.push({
            name: "EAM",
            totalResource: EAM.length,
            totalAllocated: EAMAllocated.length,
            allocatedPercent: (
              (EAMAllocated.length / EAM.length) *
              100
            ).toFixed(2),
            totalNoAllocated: EAMNoAllocated.length,
            fta: EAMFTA.length,
            ftaAllocated: EAMFTAAllocated.length,
            ftaNoAllocated: EAMFTANoAllocated.length,
            contract: EAMNoFTA.length,
            contractAllocated: EAMNoFTAAllocated.length,
            contractNoAllocated: EAMNoFTANoAllocated.length,
          });

          var ICT = res.filter((ICT) => {
            return ICT.btu == "ICT";
          });
          var ICTNoAllocated = ICT.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var ICTAllocated = ICT.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var ICTFTA = ICT.filter((fta) => {
            return fta.employmentType == "FTA";
          });
          var ICTFTANoAllocated = ICTFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var ICTFTAAllocated = ICTFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var ICTNoFTA = ICT.filter((fta) => {
            return fta.employmentType != "FTA";
          });
          var ICTNoFTAAllocated = ICTNoFTA.filter((fta) => {
            return fta.overallAllocationPercent == 100;
          });
          var ICTNoFTANoAllocated = ICTNoFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          this.btuList.push({
            name: "ICT",
            totalResource: ICT.length,
            totalAllocated: ICTAllocated.length,
            allocatedPercent: (
              (ICTAllocated.length / ICT.length) *
              100
            ).toFixed(2),
            totalNoAllocated: ICTNoAllocated.length,
            fta: ICTFTA.length,
            ftaAllocated: ICTFTAAllocated.length,
            ftaNoAllocated: ICTFTANoAllocated.length,
            contract: ICTNoFTA.length,
            contractAllocated: ICTNoFTAAllocated.length,
            contractNoAllocated: ICTNoFTANoAllocated.length,
          });

          var Total = res;
          var TotalNoAllocated = Total.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var TotalAllocated = Total.filter((all) => {
            return all.overallAllocationPercent == 100;
          });

          var TotalFTA = Total.filter((fta) => {
            return fta.employmentType == "FTA";
          });
          var TotalFTANoAllocated = TotalFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          var TotalFTAAllocated = TotalFTA.filter((all) => {
            return all.overallAllocationPercent == 100;
          });
          var TotalNoFTA = Total.filter((fta) => {
            return fta.employmentType != "FTA";
          });

          var TotalNoFTAAllocated = Total.filter((fta) => {
            return fta.overallAllocationPercent == 100;
          });

          var TotalNoFTANoAllocated = TotalNoFTA.filter((par) => {
            return (
              par.overallAllocationPercent != 100 ||
              par.overallAllocationPercent == null
            );
          });
          this.btuList.push({
            name: "Total",
            totalResource: Total.length,
            totalAllocated: TotalAllocated.length,
            allocatedPercent: (
              (TotalAllocated.length / Total.length) *
              100
            ).toFixed(2),
            totalNoAllocated: TotalNoAllocated.length,
            fta: TotalFTA.length,
            ftaAllocated: TotalFTAAllocated.length,
            ftaNoAllocated: TotalFTANoAllocated.length,
            contract: TotalNoFTA.length,
            contractAllocated: TotalNoFTAAllocated.length,
            contractNoAllocated: TotalNoFTANoAllocated.length,
          });

          res.filter((data) => {
            if (data.overallAllocationPercent == 100) {
              this.totalFullAllocation = this.totalFullAllocation + 1;
            } else if (
              data.overallAllocationPercent < 100 &&
              data.overallAllocationPercent > 0
            ) {
              this.totalPartialAllocation = this.totalPartialAllocation + 1;
            } else if (
              data.overallAllocationPercent == 0 ||
              data.overallAllocationPercent == null
            ) {
              this.totalZeroAllocation = this.totalZeroAllocation + 1;
            }
          });

          this.allocationList = res;
          this.totalAllocation = this.allocationList.length;
          this.allocationList1 = res;
          console.log(res);
          this.UtilizationTable();
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
  UtilizationTable() {
    this.governingList = [];
    let res = this.allocationList1;

    let govering2 = new GoverningDTO();

    govering2.unitName = "Total";
    let i = 0;
    this.governingList2.filter((govering) => {
      i++;
      if (govering.status) {
        let govering1 = new GoverningDTO();
        govering1.unitName = govering.text;
        var allocated = res.filter((ssu) => {
          console.log;
          return ssu.governingUnitName == govering1.unitName;
        });
        govering1.allocated = allocated.length;

        govering2.allocated = govering2.allocated + govering1.allocated;
        var billingFTAs = res.filter((ssu) => {
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.billablePercent > 0 &&
            ssu.employmentType == "FTA"
          );
        });
        govering1.billingFTAs = billingFTAs.length;
        govering2.billingFTAs = govering2.billingFTAs + billingFTAs.length;

        if (billingFTAs.length > 0) {
          var billingFTEs = 0;
          billingFTAs.filter((data) => {
            // billingFTEs=billingFTEs+data.overallAllocationPercent;
            billingFTEs = billingFTEs + data.billablePercent;
          });
          govering1.billingFTEs = billingFTEs / 100;
          govering2.billingFTEs = govering2.billingFTEs + govering1.billingFTEs;
        }
        var ippocFTAs = res.filter((ssu) => {
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.ippocPercent > 0 &&
            ssu.employmentType == "FTA"
          );
        });
        govering1.ippocFTAs = ippocFTAs.length;
        govering2.ippocFTAs = govering2.ippocFTAs + ippocFTAs.length;
        if (ippocFTAs.length > 0) {
          var ippocFTEs = 0;
          ippocFTAs.filter((data) => {
            // ippocFTEs=ippocFTEs+data.overallAllocationPercent;
            ippocFTEs = ippocFTEs + data.ippocPercent;
          });
          govering1.ippocFTEs = ippocFTEs / 100;
          govering2.ippocFTEs = govering2.ippocFTEs + govering1.ippocFTEs;
        }

        var fullBenchFtes = 0;
        let fullBench = res.filter((ssu) => {
          if (
            ssu.governingUnitName == govering1.unitName &&
            ssu.fullBench != "" &&
            ssu.fullBench != undefined &&
            ssu.employmentType == "FTA"
          ) {
            fullBenchFtes = fullBenchFtes + ssu.fullBench;
          }
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.fullBench != "" &&
            ssu.fullBench != undefined &&
            ssu.employmentType == "FTA"
          );
        });
        govering1.fullBenchHC = fullBench.length;
        govering2.fullBenchHC = govering2.fullBenchHC + fullBench.length;
        govering1.fullBenchFTEs = fullBenchFtes / 100;
        govering2.fullBenchFTEs =
          govering2.fullBenchFTEs + govering1.fullBenchFTEs;
        var partialBenchFtes = 0;
        let partBench = res.filter((ssu) => {
          if (
            ssu.governingUnitName == govering1.unitName &&
            ssu.partialBench != "" &&
            ssu.partialBench != undefined &&
            ssu.employmentType == "FTA"
          ) {
            partialBenchFtes = partialBenchFtes + ssu.partialBench;
          }
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.partialBench != "" &&
            ssu.partialBench != undefined &&
            ssu.employmentType == "FTA"
          );
        });
        govering1.partBenchHeadcount = partBench.length;
        govering2.partBenchHeadcount =
          govering2.partBenchHeadcount + partBench.length;
        govering1.partBenchFTE = partialBenchFtes / 100;
        govering2.partBenchFTE =
          govering2.partBenchFTE + govering1.partBenchFTE;
        var enablingTeamFtes = 0;
        let enablingTeam = res.filter((ssu) => {
          if (
            ssu.governingUnitName == govering1.unitName &&
            ssu.enablingTeam1 != "" &&
            ssu.enablingTeam1 != undefined &&
            ssu.employmentType == "FTA" &&
            (ssu.ml == "" || ssu.ml == undefined || ssu.ml == 0)
          ) {
            enablingTeamFtes = enablingTeamFtes + ssu.enablingTeam1;
          }
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.enablingTeam1 != "" &&
            ssu.enablingTeam1 != undefined &&
            ssu.employmentType == "FTA" &&
            (ssu.ml == "" || ssu.ml == undefined || ssu.ml == 0)
          );
        });
        govering1.enablingTeamFTE = enablingTeamFtes / 100;
        govering2.enablingTeamFTE =
          govering2.enablingTeamFTE + govering1.enablingTeamFTE;
        govering1.enablingTeamHC = enablingTeam.length;
        govering2.enablingTeamHC =
          govering2.enablingTeamHC + enablingTeam.length;
        let ela12 = 0;
        let elaFTE = res.filter((ssu) => {
          if (
            ssu.governingUnitName == govering1.unitName &&
            ssu.ela1 != "" &&
            ssu.ela1 != undefined &&
            ssu.employmentType == "FTA"
          ) {
            ela12 = ela12 + ssu.ela1;
          }
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.ela1 != "" &&
            ssu.ela1 != undefined &&
            ssu.employmentType == "FTA"
          );
        });

        let MlsFTEs = 0;
        let mls = res.filter((ssu) => {
          if (
            ssu.governingUnitName == govering1.unitName &&
            ssu.ml1 != "" &&
            ssu.ml1 != undefined &&
            ssu.employmentType == "FTA"
          ) {
            MlsFTEs = MlsFTEs + ssu.ml1;
          }
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.ml1 != "" &&
            ssu.ml1 != undefined &&
            ssu.employmentType == "FTA"
          );
        });
        let contractor = res.filter((ssu) => {
          return (
            ssu.governingUnitName == govering1.unitName &&
            ssu.employmentType != "FTA"
          );
        });
        govering1.contractor = contractor.length;
        govering2.contractor = govering2.contractor + contractor.length;
        var contractorbilling = contractor.filter((ssu) => {
          return (
            ssu.governingUnitName == govering1.unitName &&
            (ssu.billablePercent > 0 || ssu.ippocPercent > 0) &&
            ssu.employmentType != "FTA"
          );
        });
        govering1.billingContractorsHC = contractorbilling.length;
        govering2.billingContractorsHC =
          govering2.billingContractorsHC + contractorbilling.length;
        if (contractorbilling.length > 0) {
          var billingContractorsFTE = 0;
          contractorbilling.filter((data) => {
            billingContractorsFTE =
              billingContractorsFTE + data.billablePercent;
            billingContractorsFTE = billingContractorsFTE + data.ippocPercent;
          });
          govering1.billingContractorsFTE = billingContractorsFTE / 100;
          govering2.billingContractorsFTE =
            govering2.billingContractorsFTE + govering1.billingContractorsFTE;
        }
        var constructor1 = contractor.filter((ssu) => {
          return (
            ssu.governingUnitName == govering1.unitName &&
            (ssu.nonBillablePercent > 0 || ssu.supportServicesPercent > 0) &&
            ssu.employmentType != "FTA"
          );
        });
        govering1.nonBillingContractorsHC = constructor1.length;
        govering2.nonBillingContractorsHC =
          govering2.nonBillingContractorsHC + constructor1.length;
        if (constructor1.length > 0) {
          var nonbillingContractorsFTE = constructor1
            .map((item) => item.overallAllocationPercent)
            .reduce((prev, next) => prev + next);
          govering1.nonBillingContractorsFTE = nonbillingContractorsFTE / 100;
          govering2.nonBillingContractorsFTE =
            govering2.nonBillingContractorsFTE +
            govering1.nonBillingContractorsFTE;
        }

        govering1.mlHC = mls.length;
        govering2.mlHC = govering2.mlHC + govering1.mlHC;
        govering1.ml = MlsFTEs / 100;
        govering2.ml = govering2.ml + govering1.ml;
        govering1.elaFTE = ela12 / 100;
        govering2.elaFTE = govering2.elaFTE + govering1.elaFTE;
        govering1.elaHC = elaFTE.length;
        govering2.elaHC = govering2.elaHC + govering1.elaHC;
        govering1.btuFTAUtilization =
          (govering1.billingFTAs / govering1.allocated) * 100;
        var constarctNo = res.filter((ssu) => {
          return (
            ssu.employmentType != "FTA" &&
            ssu.nonBillablePercent == 0 &&
            ssu.supportServicesPercent == 0 &&
            ssu.billablePercent == 0 &&
            ssu.ippocPercent == 0 &&
            ssu.governingUnitName == govering1.unitName
          );
        });
        govering1.contractorNA = constarctNo.length;
        govering2.contractorNA = govering2.contractorNA + constarctNo.length;
        govering1.notBillable =
          govering1.fullBenchHC +
          govering1.partBenchHeadcount +
          govering1.enablingTeamHC +
          govering1.elaHC +
          govering1.mlHC +
          govering1.ippocFTAs;

        govering2.notBillable = govering2.notBillable + govering1.notBillable;
        govering1.nonbillingFTEs =
          govering1.fullBenchFTEs +
          govering1.partBenchFTE +
          govering1.enablingTeamFTE +
          govering1.elaFTE +
          govering1.ml +
          govering1.ippocFTEs;
        govering2.nonbillingFTEs =
          govering2.nonbillingFTEs + govering1.nonbillingFTEs;
        this.governingList.push(govering1);
      }
    });
    govering2.btuFTAUtilization =
      (govering2.billingFTAs / govering2.allocated) * 100;
    console.log(this.governingList2);
    this.governingList.push(govering2);
  }
  changeGovSelection() {
    this.UtilizationTable();
  }
  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
}
