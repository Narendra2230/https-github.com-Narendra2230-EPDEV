import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timeInterval } from 'rxjs/operators';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-assests-allowed',
  templateUrl: './assests-allowed.component.html',
  styleUrls: ['./assests-allowed.component.css']
})
export class AssestsAllowedComponent implements OnInit {
  current_empID: any;
  empAssetDetails: any = [];
  userType: any;
  public isLoading = false;
  privileges: any = [];
  validationFields: any = [];
  errorMessages: any = {};
  isUSEmployee: boolean = false;

  constructor(private active_route: ActivatedRoute, private profileService: ProfileService, private _http: HttpClient,
    private _alert: AlertMessageService,
    private encryptionService: EncryptionService) {
    this.current_empID =  this.encryptionService.deCryptEmpID(this.active_route.snapshot.params['empID']);
    this.userType = this.active_route.snapshot.params['userType'];
  }

  ngOnInit() {
    this.GetEmpAssetDetails();
    this.getValidationFile();
    this.getPrivilegeFile();
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
  

  getPrivilegeFile() {
    this._http.get('assets/json/privileges.json').subscribe(res => {
      this.privileges = res;
    })
  }
  getValidationFile() {
    this._http.get('assets/json/validations.json').subscribe(res => {
      this.validationFields = res;
    })
  }

  checkPreviligies(field) {
    // try{
    let type = 'USER';
    if (this.userType == 'manager' || this.userType == 'finance') type = 'MANAGER';
    if (this.userType == 'hr') type = 'HR';
    const pr = this.privileges.find(p => p.field == field);

    if (pr) {
      const { pemissions = [] } = pr;
      const pemission = pemissions.find(p => p.role == type);
      if (pemission) {
        const { actions = [] } = pemission;
        return actions.includes('EDIT')
      }
    }
    // }catch(ex){}
    return true;

  }
  
  doValidations(type, data) {
    const errorMessages = {};
    const profileFields = this.validationFields[type];
    let isError = false;
    profileFields.forEach(e => {
      const validations = e['validations'];
      validations.forEach(v => {
        if (v == 'required') {
          if(typeof(data[e.key]) == 'string'){
            data[e.key] = (data[e.key] || '').trim()
          }
          if (data[e.key] == '' || data[e.key] == undefined || data[e.key] == null) {
            if(data[e.key]!== 0 && data[e.key]!== '0'){
              isError = true;
              errorMessages[e.key] = `${[e.key]} validation error`;
            }
          }
        }
      });
    });
    this.errorMessages = errorMessages;
    console.log(errorMessages, isError)
    return isError;
  }

  hasError(field) {
    return this.errorMessages[field];
  }
  getRout() {
    const url = '/profile-landing';
    if (this.userType) {
      return `${url}/${this.userType}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
    }
    return `${url}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
  }
  GetEmpAssetDetails() {
    this.isLoading = true;
    const payload = {
      EmpId: this.current_empID
    };

    this.profileService.GetEmpAssetDetails(payload).subscribe(res => {
      this.empAssetDetails = res;
      this.isLoading = false;
    })
  }
}
