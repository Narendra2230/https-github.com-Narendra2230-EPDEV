import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from './../../../../services/omgb/home.service'
import { SessionServiceService } from './../../../../services/session/session-service.service';

@Component({
  selector: 'app-performan-evalution-header',
  templateUrl: './performan-evalution-header.component.html',
  styleUrls: ['./performan-evalution-header.component.css']
})
export class PerformanEvalutionHeaderComponent implements OnInit {
  private AssociatekeyInfo = {};
  @Input() needKeyInfo=true;
  constructor(private dialog: MatDialog, private _homeSerice: HomeService) { }
  OpenkeyInfoPopup() {
    this.openDialog();
  }
  ngOnInit() {

  }

  openDialog() {
    const dialogRef = this.dialog.open(keyInfoPopup);
    dialogRef.afterClosed().subscribe(result => {
    //  console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-keyinfo-popup',
  templateUrl: './keyinfo-popup.html',
  styleUrls: ['./performan-evalution-header.component.css']
})

export class keyInfoPopup implements OnInit {
  private associateDetails = {};
  private isLoading = false
  constructor(private _homeServices: HomeService,
    private _session: SessionServiceService,
    private dialogRef: MatDialogRef<keyInfoPopup>) {

  }

  closePopup() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.isLoading = true;
    this._homeServices.getAssociatekeyInfo({}).subscribe(data => {
      //console.log("GetAssociateKeyInfo",data)
      this.associateDetails = data
      this.isLoading = false;

    });
  }


}