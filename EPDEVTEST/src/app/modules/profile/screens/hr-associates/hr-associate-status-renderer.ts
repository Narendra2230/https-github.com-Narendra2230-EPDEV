import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ConfirmationService } from "primeng/api";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { StatusChangeComponent } from "./hr-associates.component";

@Component({
  selector: "status-component",
  template: `
    <span>
      <div (click)="changeStatus()" class="emp_status">{{ cellValue }}</div>
    </span>
  `,
  styleUrls: ["./hr-associates.component.css"],
})
export class StatusRenderer implements AgRendererComponent {
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

  changeStatus() {
    this.params.onStatusChange(this.data);
    //   const data = this.data;
    //   if (data.status == "Inactive") {
    //     this.confirmationService.confirm({
    //       message: "Do you want to active this Employee?",
    //       accept: () => {
    //         const p = {
    //           emp_id: data.id,
    //           isactive: true,
    //           lastworkingDay: "",
    //           terminationreason: "",
    //           remarks: "",
    //         };
    //         this.profileService.InactivateAssociate(p).subscribe((res: any) => {
    //           this._alert.succuss(res);
    //           this.getPersonalInfo();
    //         });
    //       },
    //     });
    //     return;
    //   }
    //   const dialogRef = this.dialog.open(StatusChangeComponent, {
    //     data: { ...data },
    //     disableClose: true,
    //   });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     //this.getPersonalInfo();
    //     console.log(`Dialog result: ${result}`);
    //   });
  }
}
