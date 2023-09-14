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
    {{params.value}}
    </span>
  `,
  styleUrls: ['./user-profile.component.css'],
})
export class DateRenderer implements AgRendererComponent {
  params: any;
  constructor(
  ) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }
}
