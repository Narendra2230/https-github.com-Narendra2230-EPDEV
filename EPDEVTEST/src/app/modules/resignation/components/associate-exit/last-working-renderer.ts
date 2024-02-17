import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ConfirmationService } from "primeng/api";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { ProfileService } from "src/app/services/profile/profile.service";

@Component({
  selector: "status-component",
  template: `
    <span>
      <input
        type="date"
        class="form-control"
        [(ngModel)]="this.lastWorkingDay"
        (change)="ChangeDate(this.exitPrimaryId, this.lastWorkingDay)"
      />
    </span>
  `,
  styleUrls: ["./associate-exit.component.css"],
})
export class LastWorkingDayRenderer implements AgRendererComponent {
  private lastWorkingDay: any;
  private exitPrimaryId: any;
  private data: any;
  private params: any;
  constructor(
    private confirmationService: ConfirmationService,
    private profileService: ProfileService,
    private _alert: AlertMessageService,
    private dialog: MatDialog
  ) {}
  agInit(params: ICellRendererParams): void {
    this.exitPrimaryId = params.data.exitPrimaryId;
    this.lastWorkingDay = params.data.lastWorkingDay;
    this.data = params.data;
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  ChangeDate(exitPrimaryId: number, lastWorkingDay: any) {
    this.params.onStatusChange(exitPrimaryId, lastWorkingDay);
  }
}
