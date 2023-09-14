import { Component, OnInit, Input} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { Router } from '@angular/router';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';

@Component({
  selector: 'app-toggle-cmpt',
  templateUrl: './toggle-cmpt.component.html',
  styleUrls: ['./toggle-cmpt.component.css']
})
export class ToggleCmptComponent implements OnInit {

  private isManager=false;
  @Input() checked:any;
  constructor(private _router: Router, private _session: SessionServiceService, private service:TimesheetService) {
    // this.isManager=this._session.isUserManager();
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

  onChageTeam(event: MatSlideToggleChange) {
    if (event.checked) {
      this._router.navigate(['timesheet-team']);
    } else {
      this._router.navigate(['timesheet']);
    }
  }


}
