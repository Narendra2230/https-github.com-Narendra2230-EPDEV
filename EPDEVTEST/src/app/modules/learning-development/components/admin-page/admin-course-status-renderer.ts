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
        class="form-check-input"
        type="checkbox"
        (change)="onStatusChange(this?.courseId, $event)"
        role="switch"
        id="flexSwitchCheckChecked"
        checked
        *ngIf="this?.courseStatus"
      />
      <input
        class="form-check-input"
        type="checkbox"
        (change)="onStatusChange(this?.courseId, $event)"
        role="switch"
        id="flexSwitchCheckChecked"
        *ngIf="!this?.courseStatus"
      />
    </span>
  `,
  styleUrls: ["./admin-page.component.css"],
})
export class AdminCourseStatusRenderer implements AgRendererComponent {
  private courseStatus: any;
  private courseId: any;
  private data: any;
  private params: any;
  constructor(
    private confirmationService: ConfirmationService,
    private profileService: ProfileService,
    private _alert: AlertMessageService,
    private dialog: MatDialog
  ) {}
  agInit(params: ICellRendererParams): void {
    this.courseId = params.data.courseId;
    this.courseStatus = params.data.courseStatus;
    this.data = params.data;
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  onStatusChange() {
    this.params.changeStatus(this.data);
  }
}
