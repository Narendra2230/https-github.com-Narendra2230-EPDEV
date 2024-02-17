import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ConfirmationService } from "primeng/api";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { EncryptionService } from "src/app/services/encryption.service";
import { ProfileService } from "src/app/services/profile/profile.service";

@Component({
  selector: "status-component",
  template: `
    <span>
    <a routerLink='{{cellLink1}}'>
      <i class="fa fa-eye" aria-hidden="true"></i>
    </a> &nbsp;&nbsp;
    <a *ngIf="shouldShow" routerLink='{{cellLink2}}'>
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </a>
    </span>
  `,
  styleUrls: ['./landing-page.component.css','../../styles.css'],
})
export class ActionRenderer implements AgRendererComponent{
  cellValue: string;
  cellLink1;
  cellLink2;
  shouldShow = false;
  private data: any;
  private params: any;
  constructor(
    private confirmationService: ConfirmationService,
    private profileService: ProfileService,
    private _alert: AlertMessageService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.cellValue = params.data.rrid;
    this.data = params.data;
    this.params = params;
    this.shouldShow = params.value
    this.cellLink1 = "/userProfile/" + this.encryptionService.enCryptEmpID(this.cellValue);
    this.cellLink2 = "/newRequest/" + this.encryptionService.enCryptEmpID(this.cellValue);
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  changeStatus() {
    this.params.onStatusChange(this.data);
  }
}
