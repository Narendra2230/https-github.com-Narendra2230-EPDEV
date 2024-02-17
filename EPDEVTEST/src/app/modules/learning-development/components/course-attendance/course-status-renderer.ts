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
        type="checkbox"
        name="status"
        [(ngModel)]="cellValue"
        value=""
        (change)="changeStatus($event)"
      />
    </span>
  `,
  styleUrls: ["./course-attendance.component.css"],
})
export class CourseStatusRenderer implements AgRendererComponent {
  private cellValue: string;
  private data: any;
  private params: any;
  constructor(
    private confirmationService: ConfirmationService,
    private profileService: ProfileService,
    private _alert: AlertMessageService,
    private dialog: MatDialog
  ) {}
  agInit(params: ICellRendererParams): void {
    this.cellValue = params.data.status;
    this.data = params.data;
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  changeStatus(event: any) {
    console.log(event.target.checked);
    this.data.status = event.target.checked;
    this.params.onStatusChange(this.data);
  }
}
