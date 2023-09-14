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
    <a href="{{params}}" target="_blank">
      <i class="fa fa-eye" aria-hidden="true"></i>
    </a> &nbsp;&nbsp;
    <a href="{{params}}" download="{{data}}">
      <i class="fa fa-download" aria-hidden="true"></i>
    </a>
    </span>
  `,
  styleUrls: ['./e-books.component.css'],
})
export class iconRenderer implements AgRendererComponent{
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
    this.data = params.data.download;
    this.params = params.value;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  changeStatus() {
    this.params.onStatusChange(this.data);
  }
}
