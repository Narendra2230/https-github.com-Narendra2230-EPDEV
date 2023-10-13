import { Component } from '@angular/core';


import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'avatar-component',
  template: `
    <span>
      <img src="{{ cellValue }}" alt="Avatar" class="associate_avatar" />
    </span>
  `,
})
export class ProfileAvatarRenderer implements AgRendererComponent {
  private cellValue: string;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.checkImage(params.data.profilE_PICTURE);
  }
    
    checkImage(avatar) {
    if (
      avatar != null &&
      avatar != undefined &&
      avatar != "null" &&
      avatar != ""
    )
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }

  refresh(params: ICellRendererParams) {
      return false
  }

}