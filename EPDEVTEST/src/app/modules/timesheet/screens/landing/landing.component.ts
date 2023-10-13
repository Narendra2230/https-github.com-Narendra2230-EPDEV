import { Component, OnInit } from "@angular/core";
import { TimesheetService } from "src/app/services/time-sheet/timesheet.service";
import { DataService } from "src/app/services/data.service";
import { SessionServiceService } from "src/app/services/session/session-service.service";
import { MatDialogRef, MatDialog } from "@angular/material";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  public TotalBillingsSummary = {};
  public hourseDataSource = {
    billable: [],
    non_Billable: [],
    poc: [],
    shared: [],
  };
  public currentTab = "bpojects";
  public currentTabSource = [];
  public pendingTimeSheet = {};
  public chartData = {
    billablePercentage: 0,
    sharedPercentage: 0,
    pocPercentage: 0,
    nonBillablePercentage: 0,
  };
  public datesObject = {};
  public timeSheetData = [];
  public globalDates = {};
  public globalDateRange = [];
  public isLoading = true;
  public isLoadingForDashboard = true;
  public isLoadingForDates = true;
  public isLoadingForSheet = true;
  public showCloneCTA = true;
  constructor(
    private _cservic: ConfirmationService,
    private dialog: MatDialog,
    private _service: TimesheetService,
    private dataService: DataService,
    private _session: SessionServiceService
  ) {}

  ngOnInit() {
    this.getGlobalDates();
    const p = {
      AssociateId: this._session.getUserID(),
      IsIntialLoad: "True",
    };
    this._service.TimesheetVersionAcceptance(p).subscribe(
      (res) => {
        if (res["allocationStatusText"] === "No") {
          this.checkAndPopulateOnboard();
        }
      },
      (res) => {}
    );

    window.scrollTo(0, 0);
  }
  resetDates() {
    this.getGlobalDates();
  }
  init(isFirst, type, isFromGlobalDateChange) {
    let startDate = this.dataService.dateFormatter(
      new Date(this.globalDates["startDate"]),
      "MM/dd/yyyy"
    ); //new Date();
    let endDate = this.dataService.dateFormatter(
      new Date(this.globalDates["endDate"]),
      "MM/dd/yyyy"
    ); // new Date();
    this.globalDateRange = [startDate, endDate];
    this.isLoading = false;
    const datePayload = {
      dateToCheck: !isFromGlobalDateChange
        ? null
        : this.globalDates["startDate"],
      EntryMode: "WEEK",
      Datetype: "CURR",
    };
    this.getDetails();
    this.getPendingEmpTimeSheetDetails(isFirst);
    this.getEmpTimeSheetDetails(datePayload);
  }

  getTotalBillings() {
    const p = {
      StartDate: this.dataService.dateFormatter(
        this.datesObject["startDate"],
        "yyyy-MM-dd"
      ),
      EndDate: this.dataService.dateFormatter(
        this.datesObject["endDate"],
        "yyyy-MM-dd"
      ),
      EmpId: this._session.getUserID(),
    };
    this._service.GetTotalHrsbyDates(p).subscribe(
      (res: any) => {
        if (res) this.TotalBillingsSummary = res;
      },
      (err) => {}
    );
  }

  getGlobalDates() {
    this.isLoading = true;
    this._service.GetglobalDate({}).subscribe((data) => {
      this.globalDates = data;
      this.init(true, "DAY", false);
    });
  }
  checkAndPopulateOnboard() {
    this.openDialog();
  }
  goToHome() {
    window.location.href = "https://ep.suneratech.com/Home/Dashboard";
    // window.location.href = 'http://epstaging.suneratech.com/Home/Dashboard'
  }
  reefrshCurrentSheet({}) {
    try {
      let EntryMode = this.datesObject["dateObj"]["EntryMode"];
      const datePayload = {
        dateToCheck: this.datesObject["startDate"],
        EntryMode: EntryMode,
        Datetype: "CURR",
      };
      this.getEmpTimeSheetDetails(datePayload);
      this.getDetails();
      this.getPendingEmpTimeSheetDetails(true);
    } catch (e) {}
  }
  onGlobalDateChange(dates) {
    // 2020-03-26
    this.globalDates["startDate"] =
      this.dataService.dateFormatter(dates[0], "yyyy-MM-dd") + "T00:00:00";
    this.globalDates["endDate"] =
      this.dataService.dateFormatter(dates[1], "yyyy-MM-dd") + "T00:00:00";
    this.init(false, "MONTH", true);
  }
  getDeliveryManagerName = (data = []) => {
    if (data.length === 0) return "---";
    const { firstName = "", lastName = "" } = data[0] || {};
    return `${firstName} ${lastName}`;
  };
  toogleTab(type) {
    const {
      billable = [],
      non_Billable = [],
      poc = [],
      shared = [],
    } = this.hourseDataSource;
    let source = [];
    if (type === "bpojects") source = billable === null ? [] : billable;
    else if (type === "npojects")
      source = non_Billable === null ? [] : non_Billable;
    else if (type === "poc") source = poc === null ? [] : poc;
    else if (type === "spojects") source = shared === null ? [] : shared;
    this.currentTab = type;
    this.currentTabSource = source;
  }
  _checkNULL(v) {
    return v === null ? [] : v;
  }
  pendingDate(data) {
    const { d = {}, monthYear = "" } = data;
    const dd = this.dataService.dateFormatter(
      `${d.timesheetDate} ${monthYear}`,
      "dd-MMM-yyyy"
    );
    const Obj = {
      dateToCheck: dd,
      EntryMode: "DAY",
      Datetype: "CURR",
    };
    this.getEmpTimeSheetDetails(Obj);
  }
  getDetails() {
    let startDate = this.dataService.dateFormatter(
      new Date(this.globalDates["startDate"]),
      "yyyy-MM-dd"
    ); //new Date();
    let endDate = this.dataService.dateFormatter(
      new Date(this.globalDates["endDate"]),
      "yyyy-MM-dd"
    ); // new Date();
    const payload = {
      EmpId: this._session.getUserID(),
      startDate: startDate,
      endDate: endDate,
    };
    this.isLoadingForDashboard = true;
    this._service.GetHoursbyEmpBillcycle(payload).subscribe(
      (res) => {
        const {
          billable = [],
          non_Billable = [],
          poc = [],
          shared = [],
          billablePercentage = 0,
          sharedPercentage = 0,
          pocPercentage = 0,
          nonBillablePercentage = 0,
        } = res[0] || {};
        this.chartData = {
          billablePercentage,
          sharedPercentage,
          pocPercentage,
          nonBillablePercentage,
        };
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
      },
      (err) => {}
    );
  }
  onDateViewChanges({ type, dateType, isNull }) {
    let d = "";
    if (dateType === "NEXT")
      d = this.dataService.dateFormatter(
        this.datesObject["endDate"],
        "dd-MMM-yyyy"
      );
    else
      d = this.dataService.dateFormatter(
        this.datesObject["startDate"],
        "dd-MMM-yyyy"
      );

    if (isNull) d = null;

    const Obj = {
      dateToCheck: d,
      EntryMode: type,
      Datetype: dateType,
    };
    this.getEmpTimeSheetDetails(Obj);
  }
  GetDates(payload2) {
    return this._service.GetDates(payload2).toPromise();
  }

  async getEmpTimeSheetDetails(datePayload) {
    this.isLoadingForSheet = true;
    const dates = await this.GetDates(datePayload);
    var curr = new Date();
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    if (datePayload.EntryMode == undefined) {
      datePayload.EntryMode = "WEEK";
    }

    firstday = dates["startDate"];
    lastday = dates["endDate"];

    var stDate = new Date(dates["endDate"]);
    dates["dateObj"] = datePayload;
    this.datesObject = dates;
    const payload = {
      BillingCycle: "",
      QueryFlag: "0",
      AssociateId: this._session.getUserID(),
      UserName: "",
      StartDate: firstday,
      EndDate: lastday,
      EntryMode: "",
    };
    this._service.GetEmpTimesheet(payload).subscribe(
      (res: any) => {
        this.timeSheetData = res;
        console.log(res);
        res.filter((data) => {
          var Todate = new Date();
          var reportDate = new Date(data.dateofReport);
          if (Todate < reportDate) {
            data.editable = false;
          }
        });
        this.showCloneCTA = this.timeSheetData.some((s) => s.clonable == true);
        this.isLoadingForSheet = false;
      },
      (err) => {}
    );
    this.getTotalBillings();
  }
  cloneTimeSheet(type) {
    this._cservic.confirm({
      message: "Are you sure that you want to perform Copy Timesheet action?",
      accept: () => {
        this.getClonedTimeSheet(type);
      },
    });
  }
  resetSheet() {
    this.init(true, "DAY", false);
  }
  getClonedTimeSheet(type) {
    this.isLoadingForSheet = true;
    let startDate = this.datesObject["startDate"]; // this.dataService.dateFormatter(new Date(this.globalDates['startDate']), 'yyyy-MM-dd');//new Date();
    let endDate = this.datesObject["endDate"]; // this.dataService.dateFormatter(new Date(this.globalDates['endDate']), 'yyyy-MM-dd');// new Date();
    const p = {
      BillingCycle: "",
      QueryFlag: "0",
      AssociateId: this._session.getUserID(),
      UserName: "",
      StartDate: startDate,
      EndDate: endDate,
      EntryMode: type,
    };

    this._service.GetCloneTimesheet(p).subscribe(
      (res: any) => {
        this.timeSheetData = res;
        this.isLoadingForSheet = false;
      },
      (err) => {}
    );
  }
  getPendingEmpTimeSheetDetails(isFirst) {
    this.isLoadingForDates = true;
    const payload = {
      date: null,
      month: isFirst
        ? null
        : this.dataService.dateFormatter(this.globalDates["startDate"], "MM"),
      year: isFirst
        ? null
        : this.dataService.dateFormatter(this.globalDates["startDate"], "yyyy"),
      AssociateId: this._session.getUserID(),
    };
    this._service.GetTimesheetEntryPendingDates(payload).subscribe(
      (res) => {
        this.pendingTimeSheet = res;
        this.isLoadingForDates = false;
      },
      (err) => {
        alert(err);
      }
    );
  }
  timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }
  onSubmit() {
    let error = false;
    this.timeSheetData.filter((data) => {
      var duration1 = this.timeStringToFloat(data.duration);
      if (duration1 < 9) {
        error = true;
        this._cservic.confirm({
          message: "Are you sure to submit duration less then 9 hours.",
          accept: () => {
            error = false;
            this.dataService.getUIShouldUpadateEvent().emit({ action: "SUBMIT" });
          },
        });
      }
    });
    if (!error) {
      this.dataService.getUIShouldUpadateEvent().emit({ action: "SUBMIT" });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(OnBoardComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: "app-onboard",
  templateUrl: "./onboard.html",
  styleUrls: [],
})
export class OnBoardComponent implements OnInit {
  constructor(
    private _dataService: DataService,
    private dialogRef: MatDialogRef<OnBoardComponent>,
    private _service: TimesheetService,
    private dataService: DataService,
    private _session: SessionServiceService
  ) {}
  ngOnInit() {}

  close() {
    const p = {
      AssociateId: this._session.getUserID(),
      IsIntialLoad: "False",
    };
    this._service.TimesheetVersionAcceptance(p).subscribe(
      (res) => {
        this.dialogRef.close();
      },
      (res) => {
        this.dialogRef.close();
      }
    );
  }

  sendKpi() {}
}
