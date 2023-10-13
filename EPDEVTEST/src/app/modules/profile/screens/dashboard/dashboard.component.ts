import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  personalInfo: any = {};
  isUSEmp: boolean = false;
  current_empID: any;
  showCompans: any = false;
  userType: any;
  backurl: any = '';
  isUSEmployee: boolean = false;

  constructor(private profileService: ProfileService, private session: SessionServiceService,
    private active_route: ActivatedRoute,
    private encryptionService: EncryptionService
  ) {
    const d = this.encryptionService.enCryptEmpID("null");
    this.current_empID =  this.encryptionService.deCryptEmpID(this.active_route.snapshot.params['empID'] || d);
    this.userType = this.active_route.snapshot.params['userType'];
    if (this.userType == 'hr') {
      this.backurl = '/hr-associates';
    }
    if (this.userType == 'manager') {
      this.backurl = '/profile-manager-view';
    }
    if (this.userType == 'finance') {
      this.backurl = '/profile-finance-view';
    }

    if (!this.current_empID || this.current_empID == 'null') {
      this.current_empID = this.session.getUserID();
    }
    if (this.session.getUserLocation() != 'India') {
      this.isUSEmp = true;
    }
  }

  ngOnInit() {
    this.init();
    this.GetLocation();
  }
  GetLocation(){
    const payload = {
      Emp_ID: this.current_empID
    };
    this.profileService.GetLocation(payload).subscribe(res => {
      this.isUSEmployee = res['location'] == 'US';
    })
  }

  init() {
    this.getPersonalInfo();

  }


  getRoutes(u) {
    let url = u;    
    if (this.userType) {
      return `${url}/${this.userType}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
    }
    return `${url}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
  }

  getPersonalInfo() {
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetAssDashboardInfo(payload).subscribe(res => {
      this.personalInfo = res;
    })
  }
}
