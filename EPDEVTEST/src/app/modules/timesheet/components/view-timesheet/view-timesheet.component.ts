import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { TimesheetService } from "src/app/services/time-sheet/timesheet.service";
import { DataService } from "src/app/services/data.service";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { SessionServiceService } from "src/app/services/session/session-service.service";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-view-timesheet",
  templateUrl: "./view-timesheet.component.html",
  styleUrls: ["./view-timesheet.component.css"],
})
export class ViewTimesheetComponent implements OnInit, OnChanges {
  @Input() timeSheetList = [];
  @Input() isLoading = false;
  @Input() timeSheetHeader = {};
  @Output() reefrshCurrentSheet = new EventEmitter();
  @Input() datesObject;
  public timeSheetData = [];
  public clientNames = [];
  public projectNames = [];
  public shiftNames = [];
  public curentDate = {
    date: {},
    str: "",
    cdate: "",
  };
  public display = false;
  public validationErrors = [];
  public isSubmitLoading = false;
  public isUpdateLoading = false;
  public shiftToggle = false;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  constructor(
    private _service: TimesheetService,
    private dataService: DataService,
    private _alert: AlertMessageService,
    private _session: SessionServiceService,
    private _cservic: ConfirmationService
  ) {
    this.curentDate.date = new Date();
    this.curentDate.str = this.dataService.dateFormatter(
      new Date(),
      "EEEE, MMMM d, y"
    );
    this.curentDate.cdate = this.dataService.dateFormatter(
      new Date(),
      "yyyy-MM-dd"
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("dd", this.timeSheetHeader)
    this.timeSheetList = this.timeSheetList.map((t) => ({
      ...t,
      dateStr: this.dataService.dateFormatter(
        new Date(t.dateofReport),
        "EEE, MMM d, y"
      ),
    }));
    this.getEmpProjects();
  }

  getProjects(obj) {
    if (!obj) return [];
    const v = obj["customerId"];
    return (this.clientNames.find((c) => c.customerId == v) || {})[
      "lstProjectDetails"
    ];
  }
  ngOnInit() {
    // this.getEmpProjects();
    this.dataService.getUIShouldUpadateEvent().subscribe((data) => {
      if (data["action"] === "SUBMIT") {
        this.display = false;
        let errors = [];
        const hasError = (v) =>
          v !== "" && v !== null && v !== undefined && v != "0";
        this.timeSheetList.forEach((s) => {
          const {
            customerId,
            projectId,
            activity,
            duration,
            DateofReport,
            dateStr,
            non_Working,
            attachDocument,
          } = s;
          if (s.editable) {
            if (non_Working === false) {
              let message = [];
              let error = false;
              // if (!hasError(customerId)) {
              //   error = true;
              //   message.push("Customer Name");
              // }
              if (!hasError(projectId)) {
                error = true;
                message.push("Project/SOW");
              }
              if (!hasError(activity)) {
                error = true;
                message.push("Activity Details");
              }
              if (!hasError(duration)) {
                error = true;
                message.push("Duration");
              }
              if ([].includes(projectId)) {
                if (!hasError(attachDocument)) {
                  error = true;
                  message.push("Attachements");
                }
              }
              if (error) {
                errors.push({
                  date: dateStr,
                  message: message.join(", \n") + " are Required fields",
                });
              }
            }
          }
        });
        if (errors.length !== 0) {
          this.validationErrors = errors;
          this.display = true;
          return;
        }
        const toSubmit = this.timeSheetList.filter((t) => t.id == 0);
        const toUpdate = this.timeSheetList.filter((t) => t.id != 0);
        if (toSubmit.length !== 0) this.submitTimeSheet(toSubmit);
        if (toUpdate.length !== 0) this.updateTimeSheet(toUpdate);
      }
    });
  }

  addSheet(i) {
    const data = JSON.parse(JSON.stringify(this.timeSheetList[i]));
    data["id"] = 0;
    data["comments"] = "";
    data["activity"] = "";
    data["duration"] = "";
    data["approvalStatus"] = null;
    data["approvalSts"] = null;
    data["attachDocument"] = "";
    data["canEdit"] = true;
    data["master_Flag"] = false;
    this.timeSheetList.splice(i + 1, 0, data);
    this.timeSheetList = this.timeSheetList;
  }

  deleteRow(i, event, sheet) {
    if (sheet["canEdit"] || sheet["id"] === 0) {
      let s = 0;
      var eleCount = 0;
      this.timeSheetList.forEach((e) => {
        if (e.dateofReport === sheet.dateofReport) {
          eleCount = s++;
        }
      });

      if (eleCount < 1) {
        alert("Action is Denided");
        return;
      } else {
        this.timeSheetList.splice(i, 1);
        this.timeSheetList = this.timeSheetList;
      }
    } else {
      if (sheet["master_Flag"] === false) {
        this._cservic.confirm({
          message: "Are you sure that you want to perform Delete action?",
          accept: () => {
            const payload = {
              id: sheet["id"],
              EmpID: sheet["empID"],
            };
            this._service.PostDelTimesheet(payload).subscribe(
              (res) => {
                this.reefrshCurrentSheet.emit({});
                this._alert.succuss("Deleted Successfully");
              },
              (err) => {}
            );
          },
        });
      }
    }
  }

  submit(obj) {
    const payload = obj;
    this.submitTimeSheet(payload);
  }
  onkeyup(i, e, ee) {
    let value = e.value;
    let status = e.status;
    if (status === false) {
      this._alert.info("you can not add more than 23 hours per day.");
    }
    this.timeSheetList[i]["duration"] = e.value;
  }
  getStatus(sheet) {
    try {
      return sheet.approvalStatus;
      const status = sheet.approvalStatus;
      if (status && status == "1") return status;
      else return 0;
    } catch (ex) {}
    return 0;
  }
  submitTimeSheet(payload = []) {
    this.isSubmitLoading = true;
    payload = payload.map((t) => ({
      id: t.id,
      EmpId: this._session.getUserID(), //t.empID,
      EntryMode: t.entryMode,
      Week: t.empID,
      DateofReport: t.dateofReport,
      BillingStatus: t.billingStatus,
      CustomerId: t.customerId,
      ProjectId: t.projectId,
      Activity: t.activity,
      Duration: t.duration,
      shiftID: t.shiftID,
      Comment: t.comment,
      attachDocument: t.attachDocument || "",
      approvalStatus: this.getStatus(t),
    }));
    console.log(payload);
    this._service.PostEmpTimesheet(payload).subscribe(
      (res) => {
        this.reefrshCurrentSheet.emit({});
        console.log(res);
        this._alert.succuss("Submitted Successfully");
        this.isSubmitLoading = false;
      },
      (err) => {
        const ms = (err["error"] || {})["message"] || "Something went wrong";
        this.reefrshCurrentSheet.emit({});
        this._alert.error(ms);
        this.isSubmitLoading = false;
      }
    );
  }
  changeProjectStatus(sheet) {
    try {
      if (sheet.customerId !== "" && sheet.projectId !== "") {
        const data = (this.clientNames.find(
          (c) => c.customerId == sheet.customerId
        ) || {})["lstProjectDetails"];
        const d =
          (data.find((c) => c.projectId == sheet.projectId) || {})
            .allocationType || "Allocation Type";
        return d;
      }
    } catch (e) {}
    return "Allocation Type";
  }
  updateTimeSheet(payload = []) {
    this.isUpdateLoading = true;
    payload = payload.map((t) => ({
      id: t.id,
      EmpId: this._session.getUserID(), //t.empID,
      EntryMode: t.entryMode,
      Week: t.empID,
      DateofReport: t.dateofReport,
      BillingStatus: t.billingStatus,
      CustomerId: t.customerId,
      ProjectId: t.projectId,
      Activity: t.activity,
      Duration: t.duration,
      shiftID: t.shiftID,
      Comment: t.comment,
      attachDocument: t.attachDocument || "",
      approvalStatus: this.getStatus(t),
    }));
    this._service.PutEmpTimesheet(payload).subscribe(
      (res) => {
        this.reefrshCurrentSheet.emit({});
        this._alert.succuss("Updated Successfully");
        this.isUpdateLoading = false;
      },
      (err) => {
        const ms = (err["error"] || {})["message"] || "Something went wrong";
        this.reefrshCurrentSheet.emit({});
        this._alert.error(ms);
        this.isUpdateLoading = false;
      }
    );
  }

  getEmpProjects() {
    const payload2 = {
      // BillingCycle: "",
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

    this._service.GetEmpClientProjectNames(payload2).subscribe(
      (res: any) => {
        console.log(res, "ty");
        const uniq = [
          ...new Set(res["lstProjectDetails"].map((a) => a.customerId)),
        ];
        this.clientNames = res["lstProjectDetails"];
        console.log(this.clientNames, "ok");
        this.updateSheetWithSingleProject();
      },
      (err) => {}
    );
  }
  getShifts() {
    const shiftPayload = {};
  }
  updateSheetWithSingleProject() {
    try {
      if (this.clientNames.length === 0) {
        const { timeSheetList } = this;
        timeSheetList.forEach((t) => {
          if (t.id == null || t.id == undefined || t.id == 0) {
            t.customerId = this.clientNames[0]["customerId"] || "0";
          }
          t["shiftNames"] = [];
          t["shiftToggle"] = false;
        });
        this.timeSheetList = timeSheetList;
      }
    } catch (ex) {}
  }
  projectChange(e, i) {
    console.log(e, i, "l");
    const v = e.target.value;

    // this.timeSheetList[i].shiftNames = [];
    if (!isNaN(v)) {
      const sowPayload = {
        SowID: v,
      };
      this.timeSheetList[i].shiftToggle = true;
      this._service
        .GetShiftDtlsProjectWise(sowPayload)
        .subscribe((res: any) => {
          console.log(res, "12");
          this.timeSheetList[i].shiftNames = res;
          // this.shiftNames = res;
          // debugger
        });
    }
    // const p = projects.find(pj=>pj.projectId == v);
    // sheet.duration = p.defaultHours || '';
  }
  changeClientName(e, sheet) {
    const v = e.target.value;
    // console.log((this.clientNames.find(c=>c.customerId==v) || {})['lstProjectDetails']);
    // this.projectNames = (this.clientNames.find(c => c.customerId == v) || {})['lstProjectDetails'];
  }

  GetDates() {
    const payload2 = {
      StartDate: "29-03-2020",
      EndDate: "29-03-2020",
      EntryMode: "DAY",
      Datetype: "CURR",
    };
    return this._service.GetDates(payload2).toPromise();
  }
  getImageURI(str) {
    if (str === "") {
      return "";
    }
    const uid = this._session.getAssociateId();
    const uname = this._session.getUserNameWithUnderScore();
    return `http://epstaging.suneratech.com/Content/Timesheets/${uid}_${uname}/${str}`;
    //  return `https://ep.suneratech.com/Content/Timesheets/${uid}_${uname}/${str}`;
  }

  async getEmpTimeSheetDetails() {
    const dates = await this.GetDates();
    const payload = {
      BillingCycle: "",
      QueryFlag: "0",
      AssociateId: "26",
      UserName: "",
      StartDate: dates["startDate"],
      EndDate: dates["startDate"],
      EntryMode: "",
    };
    this._service.GetEmpTimesheet(payload).subscribe(
      (res: any) => {
        this.timeSheetData = res;
      },
      (err) => {}
    );
  }
  private uploadFiles(sheet) {
    this.fileUpload.nativeElement.value = "";
    this.files.forEach((file) => {
      this.uploadFile(file, sheet);
    });
  }
  uploadFile(file, sheet) {
    this.isSubmitLoading = true;
    const formData = new FormData();
    formData.append("file", file.data);
    formData.append("id", this._session.getUserID().toString());
    formData.append(
      "startDate",
      this.dataService.dateFormatter(
        new Date(sheet.dateofReport),
        "dd-MMM-yyyy"
      )
    );
    file.inProgress = true;
    this._service.UploadTimesheet(formData).subscribe(
      (event: any) => {
        // if (typeof (event) === 'object') {
        sheet.attachDocument = this.getImageURI(event);
        this.timeSheetList = this.timeSheetList;
        // }
        this.isSubmitLoading = false;
      },
      (error) => {
        this.isSubmitLoading = false;
      }
    );
  }
  doCheck(sheet) {
    console.log(sheet);
    const data = this._session.getSessionDetails();
    if (
      data["employmentType"] !== "FTA [Full Time Associate]" &&
      sheet["projectId"] &&
      sheet["customerId"] &&
      sheet["projectId"] != "0" &&
      sheet["customerId"] != "0"
    ) {
      const payload = {
        EmpID: data["id"],
        ProjectId: sheet["projectId"],
        CustomerId: sheet["customerId"],
      };
      this._service.IsTimesheetLocked(payload).subscribe(
        (res) => {
          res = res[0];
          if (res["isLocked"]) {
            sheet["projectId"] = "0";
            sheet["customerId"] = "0";
            const message = `Your timesheet is locked. Please contact HR Operations - HROps@suneratech.com`;
            this._alert.error(message);
          }
        },
        (err) => {}
      );
    }
  }
  deleteAttachement(i) {
    this._cservic.confirm({
      message: "Are you sure that you want to perform Delete Attachments?",
      accept: () => {
        const sheet = this.timeSheetList[i];
        sheet.attachDocument = "";
        this.timeSheetList = this.timeSheetList;
      },
    });
  }
  onClick(sheet) {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.files = [];
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        // const ext = file.name.split('.').pop();
        // const fname = file.name.replace(/(.+)/gi, '-');
        // file.name = `${fname}.${ext}`;
        const fname = file.name.split(".");
        if (fname.length > 2) {
          this._alert.error("Bad Combination of Letters and Dot in File name");
        } else {
          this.files.push({ data: file, inProgress: false, progress: 0 });
        }
      }
      this.uploadFiles(sheet);
    };
    fileUpload.click();
  }

  getToolTipTaxt(emp) {
    try {
      return emp.popupMsg.split(",").join("\n");
    } catch (ex) {}
    return "";
  }
  getStatus2(type = 0) {
    let status = "";
    switch (type) {
      case 0:
        status = "In Progress";
        break;
      case 1:
        status = "Approved";
        break;
      case 2:
        status = "Rejected";
        break;
    }
    return status;
  }
}
