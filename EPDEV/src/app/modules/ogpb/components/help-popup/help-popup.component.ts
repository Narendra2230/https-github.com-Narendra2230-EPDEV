import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.css']
})
export class HelpPopupComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  needHelpPopup() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(HelpPopup);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.html',
  styleUrls: []
})
export class HelpPopup implements OnInit {

  constructor(private dialogRef: MatDialogRef<HelpPopup>) {

  }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }


}
