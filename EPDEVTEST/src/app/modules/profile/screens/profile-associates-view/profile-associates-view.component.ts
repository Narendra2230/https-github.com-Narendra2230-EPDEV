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
import { ProfileAvatarRenderer } from "./profile-associate-avatar-renderer";
import { ProfileEmpNameRenderer } from "./profile-associate-emp-name-renderer";
import { ProfileStatusRenderer } from "./profile-associate-status-renderer";

@Component({
  selector: 'app-profile-associates-view',
  templateUrl: './profile-associates-view.component.html',
  styleUrls: ['./profile-associates-view.component.css']
})
export class ProfileAssociatesViewComponent implements OnInit {
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
    "sow",
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
    /*  cellRenderer: "empNameRenderer",*/
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
      field: "trackname",
      filter: "agTextColumnFilter",
      sortable: true,
      headerName: "Track",
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
      field: "sowDetails",
      headerName: "SOWs",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
    },
  ];
  displayedRowData = [];
  loading = false;
  data = new MatTableDataSource();
  resultsLength = 0;
  frameworkComponents = {
    avatarRenderer: ProfileAvatarRenderer,
    empNameRenderer: ProfileEmpNameRenderer,
    statusRenderer: ProfileStatusRenderer,
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
  
  getPersonalInfo(event) {
    this.loading  = true;
    const payload = {
      EmpId: 2,
      IsActive : (event == 'Active') ? true : false
    };
    this.profileService.GetFinanceAssociateInfo(payload).subscribe((res: any) => {
      this.data = new MatTableDataSource(res);
      this.displayedRowData = res;
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      this.loading  = false;
    })
  }
  checkImage(avatar) {
    if (avatar != null && avatar != undefined && avatar != "null" && avatar != "")
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }
  onOptionsSelected(event) {
    this.getPersonalInfo(event.target.value);
  }
}

