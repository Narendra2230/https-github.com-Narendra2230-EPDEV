import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HomeService } from './../../../../services/omgb/home.service'

@Component({
  selector: 'app-pre-defined-measures',
  templateUrl: './pre-defined-measures.component.html',
  styleUrls: ['./pre-defined-measures.component.css']
})
export class PreDefinedMeasuresComponent implements OnInit {
  private goals=[];
  private goalsSet=[];
  private isLoading=false
  constructor(private _homeServices:HomeService,private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading=true;
    this._homeServices.GetListOfPreDefinedMeasures({}).subscribe((data:any) => {
      this.goals=data
      this.isLoading=false;
    });
  }

  goalMeasureReplace(){
    this.openDialog();
  }

  getrowData($event, goal){
    
    this._homeServices.UIShouldUpadate({type:'ADDGOALS', golsSet:JSON.parse(JSON.stringify(goal))})
    
  }

  openDialog() {
    let dialogRef = this.dialog.open(MeasureReplacepopup, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.html',
  styleUrls: []
})

export class MeasureReplacepopup implements OnInit {
  constructor(private dialogRef: MatDialogRef<MeasureReplacepopup>) { }
  ngOnInit() {
  }

  closeCommentpopup(){
    this.dialogRef.close(); 
  }
}
