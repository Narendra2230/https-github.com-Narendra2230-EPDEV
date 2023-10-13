import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { request } from 'http';
import { DataService } from 'src/app/services/data.service';
import { ProfileService } from '../../../../services/profile/profile.service';
import { SessionServiceService } from '../../../../services/session/session-service.service';
import { AlertMessageService } from './../../../../services/alert-message.service';

@Component({
  selector: 'app-hr-new-associates',
  templateUrl: './hr-new-associates.component.html',
  styleUrls: ['./hr-new-associates.component.css']
})
export class HrNewAssociatesComponent implements OnInit {
  personalInfo = {};
  current_empID: any;
  metaData: any = [];
  locations: any = [];
  subLocations: any = [];
  bu: any = []
  subBU: any = [];
  subTracks: any = []
  generatedEmpID: any = null;
  isLoading: boolean;
  isUSEmp: boolean;
  validationFields: any;
  errorMessages: {};

  PracticeList = [];
  SubPracticeList = [];
  CompetencyList = [];

  selectedPracticeList = [];
  selectedSubPracticeList = [];
  selectedCompetencyList = [];


  constructor(
    private _http: HttpClient,
    private profileService: ProfileService,
    private session: SessionServiceService,
    private active_route: ActivatedRoute,
    private _alert: AlertMessageService,
    private router: Router,
    private _dataService: DataService) {
    if (this.session.getUserLocation() != 'India') {
      this.isUSEmp = true;
    }

  }

  mulitselectChange(type, a, b, c) {
    console.log(type, a, b, c);
    if (type == 'PracticeList') {
      this.getSubPractices();
    }
    if (type == 'SubPracticeList') {
      this.getCompetency();
    }
    if (type == 'BTU') {
      this.getPractices(a.target.value);
    }
  }
  getPractices(v) {
    const payload = {
      "id": v,
      "GroupName": "Practice"
    }
      ;
    this.profileService.GetDependencyDropDownValues(payload).subscribe((res: any) => {
      if (res) {
        this.PracticeList = res;
        this.SubPracticeList = [];
        this.CompetencyList = [];

        this.selectedPracticeList = [];
        this.selectedSubPracticeList = [];
        this.selectedCompetencyList = [];
      }
    }, err => {

    })

  }
  getSubPractices() {
    const payload = {
      "id": this.selectedPracticeList.map(s => s.id).join(","),
      "GroupName": "SubPractice"
    };
    this.profileService.GetDependencyDropDownValues(payload).subscribe((res: any) => {
      if (res) {
        this.SubPracticeList = res || [];
        this.CompetencyList = [];

        this.selectedSubPracticeList = [];
        this.selectedCompetencyList = [];
      }
    }, err => {

    })
  }

  getCompetency() {
    const payload = {
      "id": this.selectedSubPracticeList.map(s => s.id).join(","),
      "GroupName": "Competency"
    }
      ;
    this.profileService.GetDependencyDropDownValues(payload).subscribe((res: any) => {
      if (res) {
        this.CompetencyList = res || [];
        this.selectedCompetencyList = [];
      }
    }, err => {

    })
  }

  
  doValidations(type, data) {
    const errorMessages = {};
    const profileFields = this.validationFields[type];
    let isError = false;
    profileFields.forEach(e => {
      const validations = e['validations'];
      validations.forEach(v => {
        if (v == 'required') {
          if (typeof (data[e.key]) == 'string') {
            data[e.key] = (data[e.key] || '').trim()
          }
          let doValid = true;

          if (type == 'onboarding') {
            let loc = data['location'];
            if (loc !== 'US') {
              if (e.key == 'ssn') {
                doValid = false;
              }
            }
          }

          if (type == 'onboarding') {
            let loc = data['location'];
            if (loc !== 'US') {
              if (e.key == 'lcaAssociateId') {
                doValid = false;
              }
            }
          }

          if (doValid) {
            if (data[e.key] == '' || data[e.key] == undefined || data[e.key] == null) {
              if (data[e.key] !== 0 && data[e.key] !== '0') {
                isError = true;
                errorMessages[e.key] = `${[e.key]} validation error`;
              }
            }
          }
        }
      });
    });
    this.errorMessages = errorMessages;
    console.log(errorMessages, isError)
    return isError;
  }
  getValidationFile() {
    this._http.get('assets/json/validations.json').subscribe(res => {
      this.validationFields = res;
    })
  }
  getMetaValues(type) {
    try {
      const { metaData } = this;
      const data = metaData.find(e => e.type == type);
      // console.log(type,data)
      return data.values;
    } catch (e) {

    }
    return [];
  }
  hasError(field) {
    try {
      return this.errorMessages[field];
    } catch (ex) { }
  }


  ngOnInit() {
    this.GetDropDownValues();
    this.getValidationFile();
    const data = localStorage.getItem("new-entry-data");
    this.eveluateData(JSON.parse(data))
    // this.personalInfo = JSON.parse(data);

  }

  eveluateData(data) {
    data.next_Appraisal_Date = data.next_Appraisal_Date ? this._dataService.dateFormatter(data.next_Appraisal_Date, "yyyy-MM-dd") : null;

    data.dateOfJoining = data.dateOfJoining ? this._dataService.dateFormatter(data.dateOfJoining, "yyyy-MM-dd") : null;
   
    this.PracticeList = data['practice'];
    this.SubPracticeList = data['subPractice'];
    this.CompetencyList = data['competency'];

    this.selectedPracticeList = (data['practice'] || []).filter(s => s.isSelected);
    this.selectedSubPracticeList = (data['subPractice'] || []).filter(s => s.isSelected);
    this.selectedCompetencyList = (data['competency'] || []).filter(s => s.isSelected);



    this.personalInfo = data;
    console.log(this.personalInfo);
  }



  GetDropDownValues() {
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetDropDownValues(payload).subscribe(res => {
      this.metaData = res;
      this.locations = this.getMetaValues('Location');
      this.bu = this.getMetaValues('BU');
      this.dropDownChange("Location", { target: { value: this.personalInfo['location'] } });
      this.dropDownChange("BU", { target: { value: this.personalInfo['buId'] } })
      this.dropDownChange("TRACKS", { target: { value: this.personalInfo['subbuId'] } })
    })
  }
  dropDownChange(type, e) {
    const value = e.target.value;
    if (type == 'Location') {
      const Location = this.getMetaValues('Location');
      this.subLocations = (Location.find(e => e.name == value) || {}).child || [];
    }

    if (type == 'BU') {
      const BU = this.getMetaValues('BU');

      this.subBU = (BU.find(e => e.id == value) || {}).child || [];
    }
    console.log(type, e.target.value)

    if (type == 'TRACKS') {
      this.subTracks = (this.subBU.find(e => e.id == value) || {}).child || [];
    }

  }


  getNameParam(type, v) {
    if (type == 'SUBLOCATION') return ((this.subLocations || []).find(e => e.id == v) || {}).name || '';
    if (type == 'SUBBU') return ((this.subBU || []).find(e => e.id == v) || {}).name || '';
    if (type == 'Track') return ((this.subTracks || []).find(e => e.id == v) || {}).name || '';
    if (type == 'Designations') return ((this.getMetaValues(type) || []).find(e => e.name == v) || {}).name || '';
    return ((this.getMetaValues(type) || []).find(e => e.id == v) || {}).name || '';
  }


  profileServiceData(tepDa) {
    console.log(tepDa)
  }

  getParams() {
    console.log(this.personalInfo)
    const { personalInfo } = this;
    const request = {
      "OrganizationId": personalInfo['Company'],
      "EmploymentTypeId": personalInfo['EmploymentType'],
      "Location": personalInfo['location']
    }
    this.isLoading = true;
    this.profileService.GetEMPId(request).subscribe(res => {
      this.personalInfo['associateId'] = res['emp_ID'];
      this.generatedEmpID = res['emp_ID'];
      this.isLoading = false;
      // this.personalInfo = this.personalInfo;


    })
  }


  profileSubmit() {
    if (this.doValidations('onboarding', this.personalInfo)) {
      this._alert.error("Please complete all required fields..!");
      window.scrollTo(0, 0)
      return;
    }
    console.log(this.personalInfo)
    const { personalInfo } = this;
    const request = {
      "onBoardingId": personalInfo['reqId'],

      "associateId": personalInfo['associateId'],

      "companyId": personalInfo['Company'],

      "companyName": this.getNameParam('Company', personalInfo['Company']),

      "employmentType": personalInfo['EmploymentType'],

      "practiseLead": personalInfo['practiseLead'],

      "designationId": personalInfo['designationId'],

      "designationName": this.getNameParam('Designations', personalInfo['designation']),

      "location": personalInfo['location'],

      "subLocation": personalInfo['subLocation'],

      "epAccessRoleId": personalInfo['EPAccessRole'],

      "epAccessRoleName": this.getNameParam('EPAccessRole', personalInfo['EPAccessRole']),

      "adminManager": personalInfo['reportingMgrId'],

      "functionalManager": personalInfo['fManager'],

      "bandId": personalInfo['band'],

      "bandName": this.getNameParam('Band', personalInfo['band']),

      "buddyId": personalInfo['buddy'],

      "buddyName": this.getNameParam('Buddy', personalInfo['buddy']),

      "probitionStatus": personalInfo['probitionStatus'],

      "btuId": personalInfo['btuId'],

      "nextEvaluationDate": personalInfo['next_Appraisal_Date'],

      "experience": personalInfo['experience'],

      "firstName": personalInfo['firstName'],

      "middleName": personalInfo['middleName'],

      "lastName": personalInfo['lastName'],

      "personalEmail": personalInfo['email'],

      "gender": personalInfo['gender'],

      "primarySkills": personalInfo['primarySkill'],

      "secondarySkills": personalInfo['secondarySkills'],

      "phoneNumber": personalInfo['mobileNumber'],

      "phone_Landline": personalInfo['phone_Landline'],

      "phone_Extension": personalInfo['phone_Extension'],

      "dateOfJoining": personalInfo['dateOfJoining'],

      "ssn": personalInfo['ssn'],

      "annualBasePay": personalInfo['annualBasePay'],

      "ogpb": personalInfo['ogpb'],

      "salary": personalInfo['salary'],

      "PAPersona": personalInfo['PAPersonaId'],
      
      "monthlySalary": personalInfo['monthlySalary'],

      "MonthlyBasePay": personalInfo['MonthlyBasePay'],

      "payType": personalInfo['payType'],

      "Currencies": personalInfo['Currencies'],

      "monthlyOGPB": personalInfo['monthlyOGPB'],

      "hourlyRate": personalInfo['hourlyRate'],

      "joiningBonus": personalInfo['joiningBonus'],
     
      "LCAAssociateId": personalInfo['lcaAssociateId'],

      "effectiveFrom": personalInfo['effectiveFrom'],

      "trackId": personalInfo['track'],

      "PracticeId": this.selectedPracticeList.map(s => s.id).join(","),

      "SubPracticeId": this.selectedSubPracticeList.map(s => s.id).join(","),

      "CompetencyId": this.selectedCompetencyList.map(s => s.id).join(","),

      
    }
    this.isLoading = true;
    console.log(request);
    this.profileService.PostNewEmpProfileDtls(request).subscribe(res => {
      this._alert.succuss(res);
      this.isLoading = false;
      this.router.navigate(['/hr-associates']);
    }, err => {
      this._alert.error(err)
    })

  }

}
