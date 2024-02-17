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
   <a *ngIf="this.cellValue!=null" (click)="changeStatus(this.cellValue)" class="btn btn-link">View</a>
  `,
  styleUrls: ["./detailed-request.component.css"],
})
export class HistoryViewMoreRenderer implements AgRendererComponent {
  private cellValue: string;
  private data: any;
  private params: any;
  constructor(
    private encryptionService: EncryptionService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.cellValue =params.data.comments;
    this.data = params.data;
    this.params = params;
  }
  enCryptEmpID(s) {
    return this.encryptionService.enCryptEmpID(s);
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  changeStatus() {
    this.params.onStatusChange(this.data);
  }
}
