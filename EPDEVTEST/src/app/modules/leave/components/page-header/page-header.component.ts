import { Component, OnInit,Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  private isManager=false;
  @Input() checked:any;
  @Input() onLeaves:any;
  @Input() from:any;
  
  @Input() headingText:any = "";
  constructor(private _router: Router,
     private _session: SessionServiceService, 
     private service:TimesheetService,
     private dialog: MatDialog, @Inject(MatDialog) public data: any,
    private dataService: DataService) {
    // this.isManager=this._session.isUserManager();
    if(window.location.hash.includes('associate-leave')){
      this.checked = true;
    }
   }
 
  ngOnInit() {
    const p = {
      "EmpId":this._session.getUserID()
    }
    this.service.GetApprovalEligibility(p).subscribe(res=>{
      if(res['approver']){
        this.isManager = res['approver'];
      }
    })
    
  }
  openAssociateonLeaveDialog(){
    const dialogRef = this.dialog.open(OnLeaveAssociates, { data: { list: this.onLeaves }, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onChageTeam(event) {
    if (event.checked) {
      this._router.navigate(['associate-leave']);
    } else {
      this._router.navigate(['leave']);
    }
  }

}


//LeaveBlancePopup
@Component({
  selector: 'OnLeaveAssociates',
  templateUrl: 'modal.html',
  styleUrls: ['./modal.css']
})

export class OnLeaveAssociates {
  list: any = [];
  constructor(
    private dialogRef: MatDialogRef<OnLeaveAssociates>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dataService: DataService) {
    this.list = data.list;
    console.log(this.list)
  }

  closePopup() {
    this.dialogRef.close();
  }

  formatDate(date){
    try{
      return this.dataService.dateFormatter(date, "MM/dd/yy") ;
    }catch(e){}
    return date;
  }
}