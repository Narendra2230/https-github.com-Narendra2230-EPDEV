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
      <button
        type="button"
        class="btn btn-sm mx-1 btn-danger"
        routerLink="/admin-attendance/{{ this?.courseId }}"
        title="Attendance"
      >
        <i class="fa far fa-user mr-0"></i>
      </button>
      <button
        class="btn btn-sm mx-1 btn-secondary"
        (click)="OpenCreateCourse('create', this?.data)"
        title="Edit Course"
      >
        <i class="fa far fa-edit mr-0"></i>
      </button>
      <button
        class="btn btn-sm btn-warning"
        routerLink="/admin-course-review/{{ this?.courseId }}"
        title="View Reviews"
      >
        <i class="fa fa-eye mr-0"></i>
      </button>
    </span>
  `,
  styleUrls: ["./admin-page.component.css"],
})
export class CourseActionButtonRenderer implements AgRendererComponent {
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
    this.params = params
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  OpenCreateCourse(modal:string,item:any) {
    this.params.onStatusChange(modal,item);
  }
}
