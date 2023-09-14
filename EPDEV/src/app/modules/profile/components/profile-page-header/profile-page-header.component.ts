import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';

@Component({
  selector: 'app-profile-page-header',
  templateUrl: './profile-page-header.component.html',
  styleUrls: ['./profile-page-header.component.css']
})
export class ProfilePageHeaderComponent implements OnInit {

  private isManager = false;
  @Input() checked: any;
  @Input() userType: any;
  @Input() backurl: any;

  @Input() headingText: any = "";
  constructor(private _router: Router,
    private _session: SessionServiceService,
    private service: TimesheetService,
    private dataService: DataService) {
    // this.isManager=this._session.isUserManager();
    if (window.location.hash.includes('profile-manager-view')) {
      this.checked = true;
    }
  }

  ngOnInit() {
    const p = {
      "EmpId": this._session.getUserID()
    }
    this.service.GetApprovalEligibility(p).subscribe(res => {
      if (res['approver']) {
        this.isManager = res['approver'];
      }
    })

  }


  onChageTeam(event) {
    if (event.checked) {
      this._router.navigate(['profile-manager-view']);
    } else {
      this._router.navigate(['profile-landing']);
    }
  }
}
