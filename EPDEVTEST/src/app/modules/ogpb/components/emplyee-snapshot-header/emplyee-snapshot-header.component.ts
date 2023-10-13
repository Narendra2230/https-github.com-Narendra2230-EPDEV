import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './../dialog-content/dialog-content.component'
import { from } from 'rxjs';
import { HomeService } from '../../../../services/omgb/home.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';


import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emplyee-snapshot-header',
  templateUrl: './emplyee-snapshot-header.component.html',
  styleUrls: ['./emplyee-snapshot-header.component.css']
})

export class EmplyeeSnapshotHeaderComponent implements OnInit {
  private isChecked = false;
  private isUserAccepted=false;
  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    public _homeservice: HomeService,
    public _session: SessionServiceService) {

  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, { data:{isUserAccepted:this.isUserAccepted}, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.isUserAccepted=true;
    });
  }

  ngOnInit() {
    let CurrentQuater = this._session.getCurrentQuarterDetails() || {};
    let assoid = this._session.getUserID();
    let payload = {
      QuarterId: CurrentQuater['id'],
      AssociateId: assoid
    }
    this._homeservice.UserAcceptance(payload).subscribe((res: any) => {
      if (res !== true) {
        setTimeout(s => {
          this.openDialog();
        }, 300)
      } else {
        this.isUserAccepted=true;
      }
    })

  }
}

