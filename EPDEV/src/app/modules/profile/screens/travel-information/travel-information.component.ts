import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { DataService } from 'src/app/services/data.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-travel-information',
  templateUrl: './travel-information.component.html',
  styleUrls: ['./travel-information.component.css']
})
export class TravelInformationComponent implements OnInit {
  currentTab = "VVP";
  current_empID: any;
  employeeTravelVISADetails: any = [];
  employeeTravelDrivingDetails: unknown;
  userType: any;
  isLoading: boolean;
  isLoading1: boolean;
  metaData: any = [];
  errorMessages: {};
  validationFields: any = [];
  privileges: any = [];
  isUSEmployee: boolean = false;

  constructor(
    private _http: HttpClient,
    private _alert: AlertMessageService,
    private _msg: MessageService,
    private active_route: ActivatedRoute,
    private profileService: ProfileService,
    private dataService: DataService ,
    private encryptionService: EncryptionService ) {

    this.userType = this.active_route.snapshot.params['userType'];
    this.current_empID =  this.encryptionService.deCryptEmpID(this.active_route.snapshot.params['empID']);
  }

  ngOnInit() {
    this.GetEmployeeTravelDetails();
    this.GetEmployeeTravelDetails1();
    this.GetDropDownValues();
    let to = this.active_route.snapshot.queryParams["to"];
    if (to) this.currentTab = to;
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

  getMetaValues(type) {
    try {
      const { metaData } = this;
      const data = metaData.find(e => e.type == type);
      return data.values;
    } catch (e) {

    }
    return [];
  }
  GetDropDownValues() {
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetDropDownValues(payload).subscribe(res => {
      this.metaData = res;
    })
  }
  add() {
    this.employeeTravelVISADetails.unshift({
      id: 0,
      num_Of_Entries: "",
      permittedCountries: "",
      sponsoredBy: "",
      validFrom: "",
      validTo: "",
      visaType: "",
    })
  }
  getRout() {
    const url = '/profile-landing';
    if (this.userType) {
      return `${url}/${this.userType}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
    }
    return `${url}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
  }

  employeeTravelDrivingDetailsDate(empTra) {
    for (var i = 0; i < empTra.length; i++) {
      empTra[i].validFrom = empTra[i].validFrom ? this.dataService.dateFormatter(empTra[i].validFrom, "yyyy-MM-dd") : null;
      empTra[i].validThrough = empTra[i].validThrough ? this.dataService.dateFormatter(empTra[i].validThrough, "yyyy-MM-dd") : null;
    }
    this.employeeTravelDrivingDetails = empTra;
  }

  empTravelVISADetails(empTra) {
    for (var i = 0; i < empTra.length; i++) {
      empTra[i].validFrom = empTra[i].validFrom ? this.dataService.dateFormatter(empTra[i].validFrom, "yyyy-MM-dd") : null;
      empTra[i].validTo = empTra[i].validTo ? this.dataService.dateFormatter(empTra[i].validTo, "yyyy-MM-dd") : null;
    }
    this.employeeTravelVISADetails = empTra;
  }
  GetEmployeeTravelDetails() {
    const payload = {
      EmpId: this.current_empID,
      "Status": true
    };
    this.isLoading = true;
    this.profileService.GetEmployeeTravelDetails(payload).subscribe(res => {
      this.empTravelVISADetails(res);
      this.isLoading = false;
      // this.employeeTravelVISADetails = res;
    })
  }

  GetEmployeeTravelDetails1() {
    const payload = {
      EmpId: this.current_empID,
      "Status": false
    };
    this.isLoading1 = true;
    this.profileService.GetEmployeeTravelDetails(payload).subscribe(res => {
      this.employeeTravelDrivingDetailsDate(res);
      this.isLoading1 = false;
    })
  }
  getNameParam(type, v) {
    if (type == 'PERMITCOUNTRIES') return ((this.getMetaValues(type) || []).find(e => e.name == v) || {}).id || '';
    if (type == 'VISATYPE') return ((this.getMetaValues(type) || []).find(e => e.name == v) || {}).id || '';
    return ((this.getMetaValues(type) || []).find(e => e.id == v) || {}).name || '';
  }
  PostEmpIDLDetails(data) {
    const payload = {
      ...data,
      Emp_Id: this.current_empID
    };
    if (!payload['id']) payload['id'] = null;
    this.isLoading = true;
    this.profileService.PostEmpIDLDetails(payload).subscribe(res => {
      this.isLoading = false;
      this._alert.succuss(res);
    }, err => {
      this._alert.error(err);
    })
  }

  PostEmpTravelDetails(data) {
    const empTra = this.employeeTravelVISADetails;
    const payload = {
      ...data,
      empId: this.current_empID
    };
    payload['permittedCountries'] = this.getNameParam("PERMITCOUNTRIES", payload['permittedCountries']);
    payload['visaType'] = this.getNameParam("VISATYPE", payload['visaType']);
    if (!payload['id']) payload['id'] = null;
    // this.employeeTravelVISADetails = empTra;
    this.isLoading = true;
    this.profileService.PostEmpTravelDetails(payload).subscribe(res => {
      this.isLoading = false;
      this._alert.succuss(res);
    }, err => {
      this._alert.error(err);
    })
  }

  tabClick(type, e) {
    e.preventDefault();
    this.currentTab = type;
  }

}
