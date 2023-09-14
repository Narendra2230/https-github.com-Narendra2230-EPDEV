import { Inject, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { DataService } from "src/app/services/data.service";
import { EncryptionService } from "src/app/services/encryption.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { SessionServiceService } from "src/app/services/session/session-service.service";
import { AvatarRenderer } from "./hr-associate-avatar-renderer";
import { EmpNameRenderer } from "./hr-associate-emp-name-renderer";
import { StatusRenderer } from "./hr-associate-status-renderer";

@Component({
  selector: "app-hr-associates",
  templateUrl: "./hr-associates.component.html",
  styleUrls: ["./hr-associates.component.css"],
})
export class HrAssociatesComponent implements OnInit {
  private gridApi;
  hrAssociates: any = [];
  displayedColumns: string[] = [
    "avathar",
    "empName",
    "empid",
    "designation",
    "allocation",
    "buname",
    "practice",
    "spractice",
    "competency",
    "doj",
    "dol",
    "manager",
    "etype",
    "location",
    "hrbp",
    "status",
  ];
  displayedColumnDefs = [
    {
      field: "profilE_PICTURE",
      headerName: "Avatar",
      cellRenderer: "avatarRenderer",
      width: 100,
    },
    {
      field: "emP_NAME",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Name",
      cellRenderer: "empNameRenderer",
      sortable: true,
      width: 180,
    },
    {
      field: "emP_ID",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "ID",
      sortable: true,
      width: 100,
    },

    {
      field: "employmenT_TYPE",
      headerName: "EType",
      width: 130,
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: { suppressAndOrCondition: true },
    },

    {
      field: "status",
      headerName: "Status",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      width: 130,
    },

    {
      field: "designation",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Designation",
      sortable: true,
      width: 200,
    },

    {
      field: "administrativE_MANAGER",
      headerName: "Manager",
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: { suppressAndOrCondition: true },
    },

    {
      field: "associatePhoneNumber",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Associate Phone No. ",
      sortable: true,
      width: 200,
    },
    {
      field: "associateMailAddress",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Associate Email ID",
      sortable: true,
      width: 200,
    },
    {
      field: "btu",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      sortable: true,
      headerName: "BTU",
      width: 150,
    },
    {
      field: "practice",
      filter: "agTextColumnFilter",
      headerName: "Practice",
      sortable: true,
      filterParams: { suppressAndOrCondition: true },
    },
    {
      field: "subPractice",
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: { suppressAndOrCondition: true },
      headerName: "SubPractice",
    },
    {
      field: "competency",
      filter: "agTextColumnFilter",
      sortable: true,
      headerName: "Competency",
      filterParams: { suppressAndOrCondition: true },
    },
    {
      field: "doj",
      headerName: "DOJ",
      width: 150,
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
    },
    {
      field: "dol",
      headerName: "DOL",
      width: 150,
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
    },
    
    {
      field: "report_manager_Mailaddress",
      headerName: "Manager Email ID",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
    },
    
    {
      field: "locatioN_NAME",
      headerName: "LOC",
      width: 150,
      sortable: true,
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
    },
    {
      field: "hrbp",
      headerName: "HRBP",
      sortable: true,
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
    },
  ];
  displayedRowData = [];
  loading = false;
  data = new MatTableDataSource();
  resultsLength = 0;
  frameworkComponents = {
    avatarRenderer: AvatarRenderer,
    empNameRenderer: EmpNameRenderer,
    statusRenderer: StatusRenderer,
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private profileService: ProfileService,
    private session: SessionServiceService,
    private _alert: AlertMessageService,
    private _msg: MessageService,
    private confirmationService: ConfirmationService,
    private dataService: DataService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit() {
    this.init();
  }
  enCryptEmpID(s) {
    return this.encryptionService.enCryptEmpID(s);
  }
  changeData(date) {
    return this.dataService.dateFormatter(date, "yyyy-MM-dd");
  }
  filterTable(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }

  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }

  init() {
    this.getPersonalInfo('Active');
  }

  formatDate(date) {
    return date;
  }

  newEntry() {
    const dialogRef = this.dialog.open(NewEntries, {
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
     // console.log(`Dialog result: ${result}`);
    });
  }

  changeStatus(data) {
    if (data.status == "Inactive") {
      this.confirmationService.confirm({
        message: "Do you want to active this Employee?",
        accept: () => {
          const p = {
            emp_id: data.id,
            isactive: true,
            lastworkingDay: "",
            terminationreason: "",
            remarks: "",
          };
          this.profileService.InactivateAssociate(p).subscribe((res: any) => {
            this._alert.succuss(res);
            this.getPersonalInfo('Active');
          });
        },
      });
      return;
    }
    const dialogRef = this.dialog.open(StatusChangeComponent, {
      data: { ...data },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getPersonalInfo('Active');
    //  console.log(`Dialog result: ${result}`);
    });
  }
  getPersonalInfo(event) {
    this.loading = true;
    const payload = {
      EmpId: 0,
      IsActive : (event == 'Active') ? true : false
    };
    this.profileService.GetHRAssociatedtls(payload).subscribe((res: any) => {
      this.data = new MatTableDataSource(res);
      this.displayedRowData = res;
     // console.log(this.displayedRowData);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
     // console.log("chadrna", this.sort);
      this.loading = false;
    });
  }
  checkImage(avatar) {
    if (
      avatar != null &&
      avatar != undefined &&
      avatar != "null" &&
      avatar != ""
    )
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }
  onOptionsSelected(event) {
    this.getPersonalInfo(event.target.value);
  }
}

@Component({
  selector: "NewEntries",
  templateUrl: "new-entry.html",
  styleUrls: ["./new-entry.css"],
})
export class NewEntries implements OnInit {
  list: any = [];
  hrAssociates: any = [];
  displayedColumns: string[] = [
    "avathar",
    "empName",
    "leaveType",
    "fromDate",
    "toDate",
    "strNumber_of_Days",
    "leaveStatusDesc",
    "locatioN_NAME",
    "dateOfJoining",
  ];
  loading = false;
  data = new MatTableDataSource();
  resultsLength = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private dialogRef: MatDialogRef<NewEntries>,
    @Inject(MAT_DIALOG_DATA) public mdata: any,
    private profileService: ProfileService,
    private _router: Router,
    private dataService: DataService
  ) {
  //  console.log(this.list);
  }
  ngOnInit() {
    this.init();
  }
  filterTable(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  init() {
    this.GetEMPOnboardingDtls();
  }
  checkImage(avatar) {
    if (
      avatar != null &&
      avatar != undefined &&
      avatar != "null" &&
      avatar != ""
    )
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }
  GetEMPOnboardingDtls() {
    this.loading = true;
    const payload = {
      Req_Id: "0",
    };
    this.profileService.GetEMPOnboardingDtls(payload).subscribe((res: any) => {
      const data = this.formateedDates(res);
      this.data = new MatTableDataSource(data);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      this.loading = false;
    });
  }
  navigate(e, row) {
    e.preventDefault();
    this.closePopup();
    localStorage.setItem("new-entry-data", JSON.stringify(row));
    this._router.navigate(["hr-new-associates"]);
  }
  closePopup() {
    this.dialogRef.close();
  }
  formateedDates(data) {
    data.forEach((element) => {
      element.dateOfJoining = this.formatDate(element.dateOfJoining);
    });
    return data;
  }
  formatDate(date) {
    try {
      return this.dataService.dateFormatter(date, "yyyy-MM-dd");
    } catch (e) {}
    return date;
  }
}

@Component({
  selector: "StatusChangeComponent",
  templateUrl: "./status-change.html",
  styleUrls: ["./new-entry.css"],
})
export class StatusChangeComponent implements OnInit {
  metaData: any = [];
  data = {};
  hrAssociates: any = [];
  loading = false;
  resultsLength = 0;
  activeDetails = {};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private dialogRef: MatDialogRef<NewEntries>,
    @Inject(MAT_DIALOG_DATA) public mdata: any,
    private profileService: ProfileService,
    private _router: Router,
    private _alert: AlertMessageService,
    private _msg: MessageService,
    private dataService: DataService
  ) {
    this.data = this.mdata;
   // console.log(this.data);
  }
  ngOnInit() {
    this.init();
  }

  init() {
    this.GetDropDownValues();
  }
  checkImage(avatar) {
    if (
      avatar != null &&
      avatar != undefined &&
      avatar != "null" &&
      avatar != ""
    )
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }
  GetDropDownValues() {
    this.loading = true;
    const payload = {
      Req_Id: "0",
    };
    this.profileService.GetDropDownValues(payload).subscribe((res: any) => {
      this.metaData = res;
    });
  }

  getMetaValues(type) {
    try {
      const { metaData } = this;
      const data = metaData.find((e) => e.type == type);
      return data.values;
    } catch (e) {}
    return [];
  }

  saveDetails() {
    const payload = this.activeDetails;
    const p = {
      emp_id: this.mdata.id,
      isactive: false,
      lastworkingDay: this.activeDetails["lastworkingDay"],
      terminationreason: this.activeDetails["terminationreason"],
      remarks: this.activeDetails["reason"],
    };
    this.profileService.InactivateAssociate(p).subscribe((res: any) => {
      this._alert.succuss(res);
      this.closePopup();
    });
  }

  navigate(e, row) {
    e.preventDefault();
    this.closePopup();
    localStorage.setItem("new-entry-data", JSON.stringify(row));
    this._router.navigate(["hr-new-associates"]);
  }
  closePopup() {
    this.dialogRef.close();
  }
}
