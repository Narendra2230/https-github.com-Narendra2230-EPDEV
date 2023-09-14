import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { MatSlideToggleChange } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
@Component({
  selector: 'app-timesheet-team-filter',
  templateUrl: './timesheet-team-filter.component.html',
  styleUrls: ['./timesheet-team-filter.component.css']
})
export class TimesheetTeamFilterComponent implements OnInit {
  public associates = []
  public mangerDashboardData = [];
  public filterMetaData = [];
  public managerMetaData = [];
  public chartData = [];
  private isManager = false;
  SelectTimeSheetType: string;
  TimeSheetType: string[] = ['Timesheet', 'Leave', 'Shift'];
  @ViewChild('timeSheetHeader', { static: true }) eltimeSheetHeader: ElementRef;
  @ViewChild('timeSheetFilter', { static: true }) elTimeSheetFilter: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() onDateViewChangesForLeave = new EventEmitter();
  @Input() showClone = false;
  public globalDates = {};
  public globalDateRange = [];
  public isLoading = false;
  public isSheetLoading = false;
  public datesObject = {};
  public globalMoth = '0';
  public globalYear = '2020';
  public currentDataSource = [];
  public isLoadingForDates = true;
  public isLoadingForSheet = true;
  public timeSheetData = [];
  public checked = true;
  checkedlist: any = [];
  leaveDisplayedColumns: string[] = ['action', 'avathar', 'empName', 'leaveType', 'fromDate', 'toDate', 'strNumber_of_Days', 'leaveStatusDesc'];
  shiftDisplayedColumns: string[] = ['action', 'avathar', 'empName', 'cShift', 'rShift', 'time_In', 'time_Out', 'fromDate', 'toDate', 'strNumber_of_Days', 'leaveStatusDesc'];

  displayedColumns: string[] = ['leaveType', 'fromDate', 'toDate', 'strNumber_of_Days', 'Shift', 'work_location', 'ShiftAllowance', 'leaveStatusDesc', 'action'];
  filter = {
    status: [],
    all: false,
    withdraw: false,
    inprogress: false,
    approved: false,
    rejected: false,
    toDate: "",
    fromDate: "",
    type: []
  }
  leaveTypes: any = [];
  remoteTyps: any = [];
  statusList = [{
    label: "All",
    value: null
  }, {
    label: "In Progress",
    value: "1"
  }, {
    label: "Approved",
    value: "2"
  }, {
    label: "Rejected",
    value: "3"
  }, {
    label: "WithDrawn",
    value: "4"
  }];
  leaveTyps = [];
  public showCloneCTA = true;
  public timesheetManagerAssociatePendingData = [];
  public display = false;
  public rejectComments = '';
  public isRCmtError = false;
  public searchPayload = {};
  public TotalBillingsSummary = {};
  leaves: any = [];
  resultsLength = 0;
  public isLoadingForDashboard = true;
  public pendingTimeSheet = {};
  public currentTab = "bpojects";
  tableData = new MatTableDataSource();
  public currentTabSource = [];
  public chartData_1 = { billablePercentage: 0, sharedPercentage: 0, pocPercentage: 0, nonBillablePercentage: 0 }
  public hourseDataSource = { billable: [], non_Billable: [], poc: [], shared: [] };
  public viewType = 'WEEK';
  list: any = [];
  constructor(private _service: TimesheetService, private _router: Router,
    private _lService: LeaveService,
    private _alert: AlertMessageService,
    private dataService: DataService, private _session: SessionServiceService,
    private _cservic: ConfirmationService, private messageService: MessageService) {
    sessionStorage.removeItem("hideCTAs");
    this.isManager = this._session.isUserManager();
  }
  checkImage(avatar) {
    if (avatar != null && avatar != undefined && avatar != "null" && avatar != "")
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }
  checkCount(e, i) {
    let index = this.list.findIndex(u => u.leaveId == e['leaveId'] && u.empId == e['empId']);
    this.list[index]['isChecked'] = !this.list[index]['isChecked'];
    this.list = this.list;
  }
  formatDate(date) {
    try {
      return this.dataService.dateFormatter(date, "MM/dd/yy");
    } catch (e) { }
    return date;
  }
  ngOnInit() {
    this.getGlobalDates();
    this.getRemoteTypes();
    this.SelectTimeSheetType = 'Timesheet';
    this.viewType = 'WEEK';
    window.scrollTo(0, 0);
  }
  onGlobalDateChange(dates) {
    this.elTimeSheetFilter['resetFilter']();
    this.globalDates['startDate'] = this.dataService.dateFormatter(dates[0], "yyyy-MM-dd") + 'T00:00:00';
    this.globalDates['endDate'] = this.dataService.dateFormatter(dates[1], "yyyy-MM-dd") + 'T00:00:00';
    this.init(true, false);
  }
  getRemoteTypes() {
    const payload = {
      EMPID: this._session.getUserID(),
      "isRemote": true
    }
    this._service.GetLeaveTypes(payload).subscribe(res => {
      this.remoteTyps = res;
      this.leaveTyps = (this.leaveTypes.concat(this.remoteTyps));
      this.leaveTyps = this.unique(this.leaveTyps.map(e => ({ label: e.leave_Type, value: e.leaveTypeId })));
    }, err => [

    ])
  }
  onLeaveFilter() {
    let { all, approved, toDate, fromDate, inprogress, rejected, withdraw, status, type } = this.filter;
    this.isLoading = true;
    const payload = {
      "mgrEmpId": this._session.getUserID(),
      // "leaveTypeId": type[0] ? type[0] : 0,
      "leaveTypeId": type[0] ? type.join(",") : null,
      "fromDate": fromDate ? this.dataService.dateFormatter(fromDate, "yyyy-MM-dd") : null,
      "toDate": toDate ? this.dataService.dateFormatter(toDate, "yyyy-MM-dd") : null,
      // "leaveStatusId": status[0] ? status[0] : 0,
      "leaveStatus": status[0] ? status.join(",") : null
    }
    this._lService.managerLeaveView(payload).subscribe(res => {
      this.list = res;
      this.isLoading = false;
      this.resultsLength = this.list.length;
      this.resultsLength = this.list.length;
      this.tableData = new MatTableDataSource(this.list);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    }, err => {
      this._alert.error(err.error.message);
      this.isLoading = false;
    })
  }

  resonFiet() {
    this.filter = {
      all: true,
      withdraw: false,
      inprogress: false,
      approved: false,
      rejected: false,
      toDate: "",
      fromDate: "",
      status: [],
      type: []
    };
    // this.managerLeaveView();
  }
  unique(arr) {
    const u = arr.map(item => item.value).filter((value, index, self) => self.indexOf(value) === index);
    return u.map(s => arr.find(e => e.value == s));
  }
  getGlobalDates() {
    this.isLoading = true;
    this._service.GetglobalDate({}).subscribe(data => {
      this.globalDates = data;
      this.isLoading = false;
      this.init(false, true);
    })
  }
  GetDates(payload2) {
    return this._service.GetDates(payload2).toPromise();
  }
  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.paginator.page.subscribe((event) => console.log(event))

  }

  getAssociateLeaveDetails() {
    this.isLoading = true;
    const payload = {
      "mgrEmpId": this._session.getUserID(),
      "leaveTypeId": null,
      "leaveStatus": 1,
      "fromDate": null,
      "toDate": null
    }
    this._lService.managerLeaveView(payload).subscribe(res => {
      this.list = res;
      this.isLoading = false;

      this.resultsLength = this.list.length;
      this.tableData = new MatTableDataSource(this.list);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;

    }, err => {
      this.isLoading = false;
      // this._alert.error(err.error.message);
    })
  }

  async getDateInfo(datePayload) {
    this.datesObject = this.globalDates;
    // const dates = await this.GetDates(datePayload);
    // dates['dateObj'] = datePayload;
    // this.datesObject = dates;   
  }
  onDateViewChanges({ type, dateType, isNull }) {
    let d = "";
    if (dateType === "NEXT")
      d = this.dataService.dateFormatter(this.datesObject['endDate'], "dd-MMM-yyyy")
    else
      d = this.dataService.dateFormatter(this.datesObject['startDate'], "dd-MMM-yyyy")

    if (isNull)
      d = null;

    const Obj = {
      "dateToCheck": d,
      "EntryMode": type,
      "Datetype": dateType
    }
    this.getEmpTimeSheetDetails(Obj);

  }
  _clone(data) {
    return JSON.parse(JSON.stringify(data))
  }
  donwloadSheet() {
    const p = {
      "reportingMonth": this.searchPayload['Month'],
      "reportingYear": this.searchPayload['Year'],
      "MgrID": this._session.getUserID()
    }
    this._cservic.confirm({
      message: 'Are you sure that you want to perform Download Sheet action?',
      accept: () => {
        this._service.GetEmpTimesheetdownloads(p).subscribe(res => {
          this.donwloadCSV(res)
        }, err => {
          this.donwloadCSV(err)
        })
        this.donwloadCSV({});
      }
    });
  }
  donwloadCSV(data) {
    data = [
      {
        "employment_Type": "FTA [Full Time Associate]",
        "client_Name": "Arthur J.Gallagher & Co.",
        "project_Name": "STI-AJG-QE-CloudTestr-EBS-HCM",
        "empHrsdts": [
          {
            "duration": 8.0,
            "reportingDate": "2020-05-01T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-04T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-05T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-06T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-07T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-08T00:00:00"
          },
          {
            "duration": 10.0,
            "reportingDate": "2020-05-11T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-12T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-13T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-14T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-15T00:00:00"
          },
          {
            "duration": 6.0,
            "reportingDate": "2020-05-16T00:00:00"
          },
          {
            "duration": 13.0,
            "reportingDate": "2020-05-18T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-19T00:00:00"
          }
        ],
        "mgrID": 0,
        "reportingMonth": 0,
        "reportingYear": 0,
        "organization": null,
        "id": 940,
        "empId": null,
        "firstName": "Pratyusha",
        "lastName": "Koppala",
        "phoneNumber": "1234567890",
        "emailAddress": "bhaskar.ravva@suneratech.com",
        "designation": null,
        "track": null,
        "businessUnit": "QE",
        "subBusinessUnit": "Intelligent Test Automation",
        "reportManagerID": null,
        "num_Reportees": 0,
        "hierarchyColor": null,
        "imageUrl": null,
        "lstChildren": null,
        "lstParent": null
      },
      {
        "employment_Type": "FTA [Full Time Associate]",
        "client_Name": "Covalense",
        "project_Name": "STPL-Covalense-CloudTestr",
        "empHrsdts": [
          {
            "duration": 8.0,
            "reportingDate": "2020-05-04T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-05T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-06T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-07T00:00:00"
          },
          {
            "duration": 8.0,
            "reportingDate": "2020-05-08T00:00:00"
          }
        ],
        "mgrID": 0,
        "reportingMonth": 0,
        "reportingYear": 0,
        "organization": null,
        "id": 998,
        "empId": null,
        "firstName": "Naveen Kumar",
        "lastName": "Bollapalli",
        "phoneNumber": "1234567890",
        "emailAddress": "bhaskar.ravva@suneratech.com",
        "designation": null,
        "track": null,
        "businessUnit": "QE",
        "subBusinessUnit": "Intelligent Test Automation",
        "reportManagerID": null,
        "num_Reportees": 0,
        "hierarchyColor": null,
        "imageUrl": null,
        "lstChildren": null,
        "lstParent": null
      }
    ]
    const dynamicColums = data[0].empHrsdts.map(d => d.reportingDate).map(e => ({ key: 'duration', type: "ARR", title: e }))
    let headers = [
      { key: "id", title: "EmpId" },
      { key: ["firstName", 'lastName'], title: "Name" },
      { key: "emailAddress", title: "Email_Address" },
      { key: "businessUnit", title: "Company_Unit" },
      { key: "employment_Type", title: "Type" },
      { key: "phoneNumber", title: "Phone_number" },
      { key: "client_Name", title: "ClientName" },
      { key: "project_Name", title: "ProjectName" },
    ];
    headers = headers.concat(dynamicColums);
    const mainData = [];
    data.forEach((d: any) => {
      const obj = {};
      headers.map((s: any) => {
        if (!s.type) {
          if (typeof s.key === 'string')
            obj[s.title] = d[s.key];
          else {
            obj[s.title] = s.key.map(ek => d[ek]).join(" ");
          }
        }
        else {
          obj[s.title] = (d.empHrsdts.find(e => e.reportingDate == s.title) || {})[s.key] || "";
        }
      })
      mainData.push(obj)
    });
    this.exportAsExcelFile(mainData, "OK")
  }
  onChageTeam(event: MatSlideToggleChange) {
    console.log("-------276------", event)
    if (event.checked) {
      this._router.navigate(['timesheet-team-filter']);
    } else {
      this._router.navigate(['timesheet']);
    }
  }
  onTimesheetSelect(selectvalue) {
    this.SelectTimeSheetType = selectvalue;
    if (selectvalue === 'Timesheet') {
      this.reefrshCurrentSheet();
    }
    if (selectvalue === 'Leave') {
      this.getAssociateLeaveDetails();
    }
    if (selectvalue === 'Shift') {
      this.AssociateShiftDetails();
    }
  }

  onFilter() {
    // console.log("--==-->>",this.statusList);
    let { all, approved, toDate, fromDate, inprogress, rejected, withdraw, status, type } = this.filter;
    console.log({ all, approved, toDate, fromDate, inprogress, rejected, withdraw })
    this.isLoading = true;
    const payload = {
      "EMPID": this._session.getUserID(),
      // "leaveTypeId": type[0] ? type[0] : 0,
      "leaveTypeId": type[0] ? type.join(",") : null,
      "fromDate": fromDate ? this.dataService.dateFormatter(fromDate, "yyyy-MM-dd") : null,
      "toDate": toDate ? this.dataService.dateFormatter(toDate, "yyyy-MM-dd") : null,
      // "leaveStatus": status[0] ? status[0] : 0,
      "leaveStatus": status[0] ? status.join(",") : null
    }
    this._service.getAssociateLeaveDetails(payload).subscribe((res: any) => {
      this.leaves = res;
      this.isLoading = false;
      this.resultsLength = this.leaves.length;
      this.tableData = new MatTableDataSource(this.leaves);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;

    }, err => {
      this.isLoading = false;
    })
  }
  AssociateShiftDetails() {
    const payload = {
      "StartDate": "2021-11-01",
      "EndDate": "2021-11-30",
      "ManagerId": "3721"
    };
    this._service.AssociateShiftDetails(payload).subscribe((res: any) => {
      this.list = res;
      this.isLoading = false;
      this.resultsLength = this.list.length;
      this.resultsLength = this.list.length;
      this.tableData = new MatTableDataSource(this.list);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    }, err => {
      this.isLoading = false;
    })
  }

  cloneTimeSheet(type) {
    this._cservic.confirm({
      message: 'Are you sure that you want to perform Copy Timesheet action?',
      accept: () => {
        this.getClonedTimeSheet(type)
      }
    });
  }
  resetSheet() {
    this.initTimesheet(true, "DAY", false);
  }
  getClonedTimeSheet(type) {
    this.isLoadingForSheet = true;
    let startDate = this.datesObject['startDate']; // this.dataService.dateFormatter(new Date(this.globalDates['startDate']), 'yyyy-MM-dd');//new Date();
    let endDate = this.datesObject['endDate']; // this.dataService.dateFormatter(new Date(this.globalDates['endDate']), 'yyyy-MM-dd');// new Date();
    const p = {
      "BillingCycle": "",
      "QueryFlag": "0",
      "AssociateId": this._session.getUserID(),
      "UserName": "",
      "StartDate": startDate,
      "EndDate": endDate,
      "EntryMode": type
    }

    this._service.GetCloneTimesheet(p).subscribe((res: any) => {
      this.timeSheetData = res;
      this.isLoadingForSheet = false;
    }, err => { })
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  init(isSearch, isFirstTime) {
    let startDate = this.dataService.dateFormatter(new Date(this.globalDates['startDate']), 'MM/dd/yyyy');//new Date();
    let endDate = this.dataService.dateFormatter(new Date(this.globalDates['endDate']), 'MM/dd/yyyy');// new Date();
    this.globalMoth = this.dataService.dateFormatter(this.globalDates['startDate'], 'MM');
    this.globalYear = this.dataService.dateFormatter(this.globalDates['startDate'], 'yyyy');
    this.globalDateRange = [startDate, endDate];
    this.datesObject = this._clone(this.globalDates);
    this.getDashBoardData();
    this.getChartData();
    this.getFilterData();
    this.timesheetManagerAssociatePendingCount();
    const p = {
      "Action": 0,
      "AllocationStatus": null,
      "BusinessUnit": null,
      "ReportingManager": null,
      "Associates": null,
      "Month": this.globalMoth,
      "Year": this.globalYear
    }
    this.getMangerData(this.getManagerPayload(p, isSearch, isFirstTime));
    const datePayload = {
      "dateToCheck": this.globalDates['startDate'],
      "EntryMode": "MONTH",
      "Datetype": "CURR"
    }
    this.getDateInfo(datePayload);
  }

  getDetails() {
    let startDate = this.dataService.dateFormatter(new Date(this.globalDates['startDate']), 'yyyy-MM-dd');//new Date();
    let endDate = this.dataService.dateFormatter(new Date(this.globalDates['endDate']), 'yyyy-MM-dd');// new Date();
    const payload = {
      EmpId: this._session.getUserID(),
      startDate: startDate,
      endDate: endDate

    };
    this.isLoadingForDashboard = true;
    this._service.GetHoursbyEmpBillcycle(payload).subscribe(res => {
      const { billable = [], non_Billable = [], poc = [], shared = [],
        billablePercentage = 0,
        sharedPercentage = 0,
        pocPercentage = 0,
        nonBillablePercentage = 0 } = res[0] || {};
      this.chartData_1 = { billablePercentage, sharedPercentage, pocPercentage, nonBillablePercentage };
      this.hourseDataSource = { billable, non_Billable, poc, shared };
      // this.currentTabSource = (billable === null ? [] : billable);
      if (this._checkNULL(billable).length !== 0) {
        this.toogleTab("bpojects");
      } else if (this._checkNULL(non_Billable).length !== 0) {
        this.toogleTab("npojects");
      } else if (this._checkNULL(poc).length !== 0) {
        this.toogleTab("poc");
      } else if (this._checkNULL(shared).length !== 0) {
        this.toogleTab("spojects");
      } else {
        this.toogleTab("bpojects");
      }
      this.isLoadingForDashboard = false;
    }, err => {

    });
  }

  pendingDate(data) {
    const { d = {}, monthYear = "" } = data;
    const dd = (this.dataService.dateFormatter(`${d.timesheetDate} ${monthYear}`, "dd-MMM-yyyy"))
    const Obj = {
      "dateToCheck": dd,
      "EntryMode": "DAY",
      "Datetype": "CURR"
    }
    this.getEmpTimeSheetDetails(Obj);
  }

  getPendingEmpTimeSheetDetails(isFirst) {
    this.isLoadingForDates = true;
    const payload = {
      date: null,
      month: isFirst ? null : this.dataService.dateFormatter(this.globalDates['startDate'], 'MM'),
      year: isFirst ? null : this.dataService.dateFormatter(this.globalDates['startDate'], 'yyyy'),
      AssociateId: this._session.getUserID(),
    }
    this._service.GetTimesheetEntryPendingDates(payload).subscribe(res => {
      this.pendingTimeSheet = res;
      this.isLoadingForDates = false;
    }, err => {
      alert(err)
    });

  }

  initTimesheet(isFirst, type, isFromGlobalDateChange) {
    let startDate = this.dataService.dateFormatter(new Date(this.globalDates['startDate']), 'MM/dd/yyyy');//new Date();
    let endDate = this.dataService.dateFormatter(new Date(this.globalDates['endDate']), 'MM/dd/yyyy');// new Date();
    this.globalDateRange = [startDate, endDate];
    this.isLoading = false;
    const datePayload = {
      "dateToCheck": !isFromGlobalDateChange ? null : this.globalDates['startDate'],
      "EntryMode": type,
      "Datetype": "CURR"
    }
    // this.getDetails();
    // this.getPendingEmpTimeSheetDetails(isFirst);
    this.getEmpTimeSheetDetails(datePayload);
  }

  filterReset() {
    const p = {
      "Action": '0',
      "AllocationStatus": null,
      "BusinessUnit": null,
      "ReportingManager": null,
      "Associates": null,
      "Month": null, //this.globalMoth,
      "Year": null, //this.globalYear
    }
    this.getMangerData(this.getManagerPayload(p, false, false));
  }

  timesheetManagerAssociatePendingCount() {
    const payload = {
      "StartDate": this.dataService.dateFormatter(this.datesObject['startDate'], "dd-MMM-yyyy"),
      "EndDate": this.dataService.dateFormatter(this.datesObject['endDate'], "dd-MMM-yyyy"),
      "TimesheetStatus": 0,  //0-pending 1-approvedd 2-Reject
      "AssociateId": this._session.getUserID(),  ///Manager ID must
      "ManagerId": this._session.getUserID(),
    };
    this._service.TimesheetManagerAssociatePendingCount(payload).subscribe((res: any) => {
      this.timesheetManagerAssociatePendingData = res;
    }, err => {
    });
  }


  // reefrshCurrentSheet({ }) {
  //   try {
  //     let EntryMode = this.datesObject['dateObj']['EntryMode'];
  //     const datePayload = {
  //       "dateToCheck": this.datesObject['startDate'],
  //       "EntryMode": EntryMode,
  //       "Datetype": "CURR"
  //     }
  //     this.getEmpTimeSheetDetails(datePayload);
  //     this.getDetails();
  //     this.getPendingEmpTimeSheetDetails(true);
  //   } catch (e) { }
  // }

  async getEmpTimeSheetDetails(datePayload) {

    const dates = await this.GetDates(datePayload);
    dates['dateObj'] = datePayload;
    this.datesObject = dates;
    const p = {
      "Action": 0,
      "AllocationStatus": null,
      "BusinessUnit": null,
      "ReportingManager": null,
      "Associates": null,
      "Month": null,
      "Year": null
    }
    this.getMangerData(this.getManagerPayload(p, false, false));
  }

  resetDates() {
    this.getGlobalDates();
  }

  check(i, e) {
    var status = e.target.checked;
    const { managerMetaData } = this;
    if (i === 'all') {
      if (status)
        managerMetaData.forEach(m => { if (m['timesheetStatus'] !== 'Approved') m.checked = true });
      else
        managerMetaData.forEach(m => { if (m['timesheetStatus'] !== 'Approved') m.checked = false });
    } else {
      managerMetaData[i]['checked'] = status;
    }
    this.managerMetaData = managerMetaData;
  }

  approve(emp) {
    this._session.storeSelectedEmpDetails(emp);
    this._session.storeSelectedGlobalTimeDetails(this.globalDates);
    this._router.navigate(['/manager-details']);
  }
  getDashBoardData() {
    const payload = {
      "StartDate": this.dataService.dateFormatter(this.datesObject['startDate'], "dd-MMM-yyyy"),
      "EndDate": this.dataService.dateFormatter(this.datesObject['endDate'], "dd-MMM-yyyy"),
      "UserName": null,
      "AssociateId": this._session.getUserID(),  ///Manager ID must
      "ManagerId": this._session.getUserID(),
    };
    this._service.GetManagerDasboardBar(payload).subscribe((res: any) => {
      this.mangerDashboardData = res;
      let isSeleted = false;
      this.mangerDashboardData.forEach((s, i) => {
        if (!isSeleted && this._checkNULL(s['timesheetManager_DashbordTopBars']).length !== 0) {
          isSeleted = true;
          this.toogleTab_1(i);
        }
      })
    }, err => {
    });
  }
  toogleTab_1(i) {
    console.log("------537------", i)
    const { mangerDashboardData } = this;
    mangerDashboardData.forEach(d => d.isSelected = false);
    mangerDashboardData[i]['isSelected'] = true;
    this.mangerDashboardData = mangerDashboardData;
    this.currentDataSource = this._checkNULL(mangerDashboardData[i]['timesheetManager_DashbordTopBars']);
  }

  toogleTab(type) {
    const { billable = [], non_Billable = [], poc = [], shared = [] } = this.hourseDataSource;
    let source = [];
    if (type === 'bpojects') source = billable === null ? [] : billable;
    else if (type === 'npojects') source = non_Billable === null ? [] : non_Billable;
    else if (type === 'poc') source = poc === null ? [] : poc;
    else if (type === 'spojects') source = shared === null ? [] : shared;;
    this.currentTab = type;
    this.currentTabSource = source;
  }
  _checkNULL(v) {
    return (v === null ? [] : v)
  }

  getFilterData() {
    const payload = {
      "StartDate": this.dataService.dateFormatter(this.datesObject['startDate'], "dd-MMM-yyyy"),
      "EndDate": this.dataService.dateFormatter(this.datesObject['endDate'], "dd-MMM-yyyy"),
      "UserName": null,
      "AssociateId": this._session.getUserID(),  ///Manager ID must
      "ManagerId": this._session.getUserID(),
    };
    this._service.GetTimeSheetFilters(payload).subscribe((res: any) => {
      this.filterMetaData = res;
    }, err => {

    });
  }
  onSearch(data) {
    this.getMangerData(this.getManagerPayload(data, true, false));
  }

  getManagerPayload(data, isSearch, isFirstTime) {
    if (isFirstTime) data['TimeheetAction'] = '0';
    if (isFirstTime) data['Month'] = null;
    if (isFirstTime) data['Year'] = null;
    return {
      "StartDate": isFirstTime ? null : this.dataService.dateFormatter(this.datesObject['startDate'], "yyyy-MM-dd"),
      "EndDate": isFirstTime ? null : this.dataService.dateFormatter(this.datesObject['endDate'], "yyyy-MM-dd"),
      "ManagerId": this._session.getUserID(),
      "TimesheetStatus": data['Action'] === "" ? '0' : data['Action'],///Pending 1,approve 2, reject 3
      "IsSearch": isSearch, //If search button click send Month and Year mandatory and Isserach 1 else 0
      "Month": data['Month'] !== "" ? data['Month'] : null, //this.globalMoth,
      "Year": data['Year'] !== "" ? data['Year'] : null, // this.globalYear,
      "AllocationTypeOfSOW": data['AllocationStatus'] === "" ? null : data['AllocationStatus'],  //If search button click send value else null
      "AssociatePrimaryId": data['Associates'] === "" ? null : data['Associates'],   //If search button click send value else null or (Topbar click on associate count mandatory else null)
      "BusinessUnitId": data['BusinessUnit'] === "" ? null : data['BusinessUnit'],   //If search button click send value else null
      "Report_Manager_Id": data['ReportingManager'] === "" ? null : data['ReportingManager'],   //If search button click send value else null
      "customerId": null, //If top bar click on associate count send value mandatory  else null
      "SOWID": null, //If top bar click on associate count send value mandatory  else null
      "IsIntitalLoad": isFirstTime   //First time load set 1 and send start date and end date NULL
    }

    // {"StartDate":null,"EndDate":null,"ManagerId":3050,"TimesheetStatus":"0","IsSearch":false,"Month":"null","Year":"null","AllocationTypeOfSOW":null,"AssociatePrimaryId":null,"BusinessUnitId":null,"Report_Manager_Id":null,"customerId":null,"SOWID":null,"IsIntitalLoad":true}
  }

  getMangerData(mdataPayload) {
    this.isSheetLoading = true;
    this.searchPayload = mdataPayload;
    this._service.ViewManagerTimesheetMasterData(mdataPayload).subscribe((res: any) => {
      this.managerMetaData = res;
      this.isSheetLoading = false;
    }, err => {

    });
  }

  getChartData() {
    const chartPayload = {
      "StartDate": this.dataService.dateFormatter(this.datesObject['startDate'], "dd-MMM-yyyy"),
      "EndDate": this.dataService.dateFormatter(this.datesObject['endDate'], "dd-MMM-yyyy"),
      "UserName": null,
      "AssociateId": this._session.getUserID(),
      "ManagerId": null
    }
    this._service.GetTimesheetAllocationStatus(chartPayload).subscribe((res: any) => {
      this.chartData = res;
    }, err => {

    });
  }

  reject() {
    const { managerMetaData } = this;
    let selected = managerMetaData.filter(c => c.checked);
    let isREJEcTED = selected.find(s => s.timesheetStatus === 'Rejected');
    if (isREJEcTED) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'You should not selected already Rejected ones' });
      return;
    }
    if (selected.length !== 0) {
      this._cservic.confirm({
        message: 'Are you sure that you want to perform Reject action?',
        accept: () => {
          this.rejectComments = "";
          this.isRCmtError = false;
          this.display = true
        }
      });

    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'you did not select any timesheet' });
    }
  }

  onSubmit(status, ManagerComment) {
    const { managerMetaData } = this;
    let selected = managerMetaData.filter(c => c.checked);
    if (selected.length !== 0) {
      this._cservic.confirm({
        message: 'Are you sure that you want to perform Approve/Unlock action?',
        accept: () => {
          this._submit(status, selected);
          this.display = false;
        }
      });

    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'you did not select any timesheet' });
    }
  }
  rejectsubmit() {
    const { managerMetaData, rejectComments } = this;
    if (rejectComments === '' || rejectComments === null) {
      this.isRCmtError = true;
      return;
    }
    let selected = managerMetaData.filter(c => c.checked);
    this._submit(2, selected);
  }
  _submit(status, selected) {
    this.display = false
    this.isRCmtError = false;
    let payload = {
      "StartDate": this.dataService.dateFormatter(this.datesObject['startDate'], "dd-MMM-yyyy"),
      "EndDate": this.dataService.dateFormatter(this.datesObject['endDate'], "dd-MMM-yyyy"),
      "TimesheetStatus": status, //1 for approve 2 reject mandatory 
      "IsSearch": false,
      "Month": null, //Mandatory for if isserach true
      "Year": null, //Mandatory for if isserach true
      "ManagerComment": this.rejectComments,//Reject comments 
      "approveSOWListForassociates": []
    }
    let isSearch = selected.some(s => s.isSearch);
    if (isSearch) {
      payload.StartDate = null;
      payload.EndDate = null;
      payload.Month = selected[0].month;
      payload.Year = selected[0].year;
      payload.IsSearch = true
    }
    const data = selected.map(s => (
      {
        "AssociatePrimaryId": s['associatePrimaryId'],
        "CustomerId": s['customer'],
        "SOWID": s['msowId'],
        "IndividualComment": "",
        "IsLevel2Approval": s['isLevel2Approval'],
        "Approver": s['approver'],
      }));
    payload.approveSOWListForassociates = data;
    this._service.TimesheetMonthOrPayrollBulckApproval(payload).subscribe(data => {
      if (status == '1') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet Approved Successfully' });
      } else if (status == '3') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet unlocked Successfully' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet Rejected Successfully' });
      }
      this.filterReset();
      this.display = false;
    })

  }
  onViewTypeChange(type) {
    this.viewType = type;
    this.onDateViewChangesForLeave.emit({ type, dateType: "CURR", isNull: true })
  }

  prev(type) {
    this.onDateViewChangesForLeave.emit({ type, dateType: "PREV" })
  }
  next(type) {
    this.onDateViewChangesForLeave.emit({ type, dateType: "NEXT" })
  }

  goToDetails(emp, event) {
    event.preventDefault();
    this._session.storeSelectedEmpDetails(emp);
    sessionStorage.setItem("hideCTAs", "true");
    this._session.storeSelectedGlobalTimeDetails(this.globalDates);
    this._router.navigate(['/manager-details']);
  }

  // getGlobalDates() {
  //   this.isLoading = true;
  //   this._service.GetglobalDate({}).subscribe(data => {
  //     this.globalDates = data;
  //     this.initTimesheet(true, "DAY", false);
  //   })
  // }

  getTotalBillings() {
    const p = {
      "StartDate": this.dataService.dateFormatter(this.datesObject['startDate'], "yyyy-MM-dd"),
      "EndDate": this.dataService.dateFormatter(this.datesObject['endDate'], "yyyy-MM-dd"),
      EmpId: this._session.getUserID()
    }
    this._service.GetTotalHrsbyDates(p).subscribe((res: any) => {
      if (res)
        this.TotalBillingsSummary = res;
    }, err => { })
  }


  //   async getEmpTimeSheetDetails(datePayload) {
  //   this.isLoadingForSheet = true;
  //   const dates = await this.GetDates(datePayload);
  //   dates['dateObj'] = datePayload;
  //   this.datesObject = dates;
  //   const payload = {
  //     BillingCycle: "",
  //     "QueryFlag": "0",
  //     "AssociateId": this._session.getUserID(),
  //     "UserName": "",
  //     "StartDate": dates['startDate'],
  //     "EndDate": dates['endDate'],
  //     "EntryMode": ""
  //   }
  //   this._service.GetEmpTimesheet(payload).subscribe((res: any) => {
  //     this.timeSheetData = res;
  //     this.showCloneCTA = this.timeSheetData.some(s=>s.clonable ==  true)
  //     this.isLoadingForSheet = false;
  //   }, err => { })
  //   this.getTotalBillings();
  // }


  goToHome() {
    // window.location.href = 'https://ep.suneratech.com/Home/Dashboard'
    window.location.href = 'http://epstaging.suneratech.com/Home/Dashboard'
  }

  reefrshCurrentSheet() {
    try {
      let EntryMode = this.datesObject['dateObj']['EntryMode'];
      const datePayload = {
        "dateToCheck": this.datesObject['startDate'],
        "EntryMode": EntryMode,
        "Datetype": "CURR"
      }
      this.getEmpTimeSheetDetails(datePayload);
      // this.getDetails();
      // this.getPendingEmpTimeSheetDetails(true);
    } catch (e) { }
  }
  leaveApprove(status) {
    var txtMsg = "";
    this.checkedlist = this.list.filter(x => x.isChecked === true);
    if (this.checkedlist.length === 0) {
      this._alert.error('Please select atleast one Employee..!');
      return;
    }
    if (status === 3) {
      txtMsg = "Are you sure you want to Reject the selected Request(s)?";
    } else {
      txtMsg = "Are you sure you want to Approve the selected Request(s)?";
    }

    this._cservic.confirm({
      message: txtMsg,
      accept: () => {
        const payload: any = [];
        this.isLoading = true;
        this.checkedlist.forEach(row => {
          payload.push({
            "empId": row.empId,
            "leaveId": row.leaveId,
            "leaveTypeId": row.leaveTypeId,
            "leaveType": row.leaveType,
            "fromDate": row.fromDate,
            "toDate": row.toDate,
            "leaveStatus": status
          });
        });


        this._service.actionOnLeave(payload).subscribe((res: any) => {
          this._alert.succuss(res[0]['message']);
          this.getAssociateLeaveDetails();
          this.isLoading = false;
        }, err => {
          this._alert.error(err.error.message);
          this.isLoading = false;
        })
      }
    });
  }

  shiftApprove(status) {
    var txtMsg = "";
    this.checkedlist = this.list.filter(x => x.isChecked === true);
    if (this.checkedlist.length === 0) {
      this._alert.error('Please select atleast one Employee..!');
      return;
    }
    if (status === 3) {
      txtMsg = "Are you sure you want to Reject the selected Request(s)?";
    } else {
      txtMsg = "Are you sure you want to Approve the selected Request(s)?";
    }

    this._cservic.confirm({
      message: txtMsg,
      accept: () => {
        const payload: any = [];
        this.isLoading = true;
        this.checkedlist.forEach(row => {
          payload.push({
            "empId": row.empId,
            "AssociateShiftId": row.associateShiftId,
            "ApprovalStatusId": status
          });
        });


        this._service.ApproveAssociateShiftDetails(payload).subscribe((res: any) => {
          this._alert.succuss(res[0]['message']);
          this.AssociateShiftDetails();
          this.isLoading = false;
        }, err => {
          this._alert.error(err.error.message);
          this.isLoading = false;
        })
      }
    });
  }


}
