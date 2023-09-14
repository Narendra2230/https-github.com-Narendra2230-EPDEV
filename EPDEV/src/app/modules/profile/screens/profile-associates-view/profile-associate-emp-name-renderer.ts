import { Component } from "@angular/core";

import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { EncryptionService } from "src/app/services/encryption.service";

@Component({
  selector: "emp-name-component",
  template: `
    <span>
      <a routerLink="{{ cellLink }}">{{ cellValue }}</a>
    </span>
  `,
})
export class ProfileEmpNameRenderer implements AgRendererComponent {
  private cellValue: string;
  private cellLink: string;

  constructor(private encryptionService: EncryptionService) {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = params.data.emP_NAME;
    this.cellLink = "/profile-landing/hr/" + this.enCryptEmpID(params.data.id);
  }

  enCryptEmpID(s) {
    return this.encryptionService.enCryptEmpID(s);
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
