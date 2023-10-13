import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TimesheetService } from "src/app/services/time-sheet/timesheet.service";
import { DataService } from "src/app/services/data.service";
import { SessionServiceService } from "src/app/services/session/session-service.service";
import { Router } from "@angular/router";
import { SowShiftRoster } from "./model/sowshiftroster";
import { AlertMessageService } from "src/app/services/alert-message.service";

@Component({
  selector: "app-sowshift-roster",
  templateUrl: "./sowshift-roster.component.html",
  styleUrls: ["./sowshift-roster.component.css"],
})
export class SowshiftRosterComponent implements OnInit {
  associateID: any;
  private isChecked = false;
  postBody = [];
  sowShiftRoster: SowShiftRoster = new SowShiftRoster();
  constructor(
    private _service: TimesheetService,
    private _session: SessionServiceService,
    private _alert:AlertMessageService
  ) {}

  ngOnInit() {
    this.associateID = this._session.getUserID();
    this.getProjectDetails();
  }

  getProjectDetails() {
    this._service.GetProjectDetails("").subscribe((res: any) => {
      this.getProjectDetails = res;
      console.log(res);
    });
  }
  chk(i, e) {
    console.log("winner", e);
    this.sowShiftRoster = new SowShiftRoster();
    e.lstShiftDetails.map((data) => {
      if (!data.assigned) {
        data.assigned = null;
      }
    });
    this.sowShiftRoster.projectId = e.projectId;
    this.sowShiftRoster.lstShiftDetails = e.lstShiftDetails;
    this.postBody=[];
    this.postBody.push(this.sowShiftRoster);
    this._service.PostProjectShiftDetails(this.postBody)
    .subscribe((res)=>{
      console.log(res)
      this._alert.succuss('Sow Shift successfully updated.');
    })
  }
  PostProjectShiftDetails() {}
}
