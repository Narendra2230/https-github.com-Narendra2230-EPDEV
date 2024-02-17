import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { DataService } from 'src/app/services/data.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  isUSEmp: boolean = false;
  current_empID: any;
  eMPInsuranceInfo: any = [];
  currentSelection = 'BCBSOption6';
  contentEditable: boolean = true;
  userType: any;
  isLoading: boolean;
  empInsuWaiverDtls: any = {};
  privileges: any = [];
  validationFields: any = [];
  errorMessages: {};
  isUSEmployee: boolean = false;

  constructor(private profileService: ProfileService, private session: SessionServiceService,
    private active_route: ActivatedRoute, private dialog: MatDialog,
    private _http: HttpClient,
    private _alert: AlertMessageService, private _msg: MessageService,
    private encryptionService: EncryptionService
  ) {
    this.current_empID =  this.encryptionService.deCryptEmpID(this.active_route.snapshot.params['empID']);
    this.userType = this.active_route.snapshot.params['userType'];
    // if (this.session.getUserLocation() != 'India') {
    //   this.isUSEmp = true;
    // }
  }
  openHistory() {
    const dialogRef = this.dialog.open(InsuranceComponent, { data: {}, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getRout() {
    const url = '/profile-landing';
    if (this.userType) {
      return `${url}/${this.userType}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
    }
    return `${url}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
  }

  ngOnInit() {
    this.getEmpInsuWaiverDtls();
    this.getValidationFile();
    this.getPrivilegeFile();
    this.GetLocation();
  }
  GetLocation() {
    const payload = {
      Emp_ID: this.current_empID
    };
    this.profileService.GetLocation(payload).subscribe(res => {
      this.isUSEmployee = res['location'] == 'US';
      this.isUSEmp = this.isUSEmployee;
      if (this.isUSEmp == true) {
        this.GetEMPInsuranceInfo();
      } else {
        this.GetIndianEmpInsuranceDtls();
      }
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
  getInsurenceempBenDtls(mainIndex) {
    try {
      const e = this.eMPInsuranceInfo[mainIndex];
      const { insurancePlans } = e;
      const p = insurancePlans.find(ins => ins['selectedPlan'] == true) || {};
      return p['empBenDtls'] || []
    } catch (ex) { }
    return [];
  }
  enrollment(event, mainIndex) {
    let contentEditable;
    if (event.target.checked) {
      contentEditable = true;
    } else {
      contentEditable = false;
    }
    const e = this.eMPInsuranceInfo[mainIndex];
    e['enabled'] = contentEditable;
    this.eMPInsuranceInfo = this.eMPInsuranceInfo;
  }
  enrollment1(event) {
    let contentEditable;
    if (event.target.checked) {
      contentEditable = true;
    } else {
      contentEditable = false;
    }
    this.contentEditable = contentEditable;
  }
  selectPlan(planName, mainIndex, secondIndex) {
    const e = this.eMPInsuranceInfo[mainIndex];
    const { insurancePlans } = e;
    insurancePlans.forEach(ins => {
      ins['selectedPlan'] = false;
      ins['empBenDtls'].forEach(inss => {
        // if (inss['empSelected'] == 'True') {
        //   inss['selectedOption'] = false;
        // } else {
        //   inss['selectedOption'] = false;
        // }

      });
    });
    insurancePlans[secondIndex]['selectedPlan'] = true;
    this.eMPInsuranceInfo = this.eMPInsuranceInfo
  }
  selectOption(mainIndex, ii) {
    const e = this.eMPInsuranceInfo[mainIndex];
    const { insurancePlans } = e;
    const p = insurancePlans.find(ins => ins['selectedPlan'] == true) || {};
    p['empBenDtls'].forEach(ins => {
      ins['selectedOption'] = false;
    });
    p['empBenDtls'][ii]['selectedOption'] = true;
    this.eMPInsuranceInfo = this.eMPInsuranceInfo
  }
  dataTrns() {
    const data = []
    this.eMPInsuranceInfo.forEach(e => {
      const { insurancePlans } = e;
      if(e.status == false){
        e.enabled = true;
      }else{
        e.enabled = false;
      }
      // 
      let hasNoPlans = false;
      insurancePlans.forEach(element => {
        const empSelected = element['empBenDtls'].find(d => d.empSelected == 'True');
        if (empSelected) {
          empSelected['selectedOption'] = true;
          element['selectedPlan'] = true;
        } else {
          hasNoPlans = true;
        }
      });
      if (hasNoPlans) {
        // insurancePlans[0]['selectedPlan'] = true;
      }
      data.push(e)
    });
    console.log(data)
    this.eMPInsuranceInfo = data;
  }
  save() {
    if (this.contentEditable) {
      this.PostEmpInsuWaiverDtls();
      return;
    }
    console.log(this.eMPInsuranceInfo)
    const data = [];
    const e = this.eMPInsuranceInfo.forEach(e => {
      const { insurancePlans } = e;
      if (!e['enabled']) {
        // const p = insurancePlans.find(ins => ins['selectedPlan'] == true) || {};
        insurancePlans.forEach(p => {
          // const pp = p['empBenDtls'].find(ins => ins['selectedOption'] == true) || {};
          p['empBenDtls'].forEach(pp => {
            if (pp.selectedOption) {
              data.push({
                "InsuranceType": p.insuranceType || "",
                "InsurancePlanId": pp.insurancePlanId || "",
                "PlanName": p.planName || "",
                "PremiumId": pp.premiumId || "",
                "Benificiary": pp.benificiary || "",
                "Premium": pp.premium || "",
                "Selected": pp.selectedOption ? "True" : "False",
                "EmployeeInsurancePremiumId": pp.employeeInsurancePremiumId || "",
                "empId": this.current_empID

              })
            }
          });
        });
      }

    });
    console.log(data)
    this.isLoading = true;
    this.profileService.PostUSEmpInsuranceInfo(data).subscribe(res => {
      this._alert.succuss(res)
      this.isLoading = false;
    })
  }
  getEmpInsuWaiverDtls() {
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.getEmpInsuWaiverDtls(payload).subscribe(res => {
      this.empInsuWaiverDtls = res;
      // this.empInsuWaiverDtls['termsAccepted'] = true;
      if (this.empInsuWaiverDtls['termsAccepted']) {
        this.contentEditable = true;
      }
    })
  }
  PostEmpInsuWaiverDtls() {
    console.log(this.empInsuWaiverDtls)
    const payload = {
      ...this.empInsuWaiverDtls,
      EmpId: this.current_empID
    };
    this.profileService.PostEmpInsuWaiverDtls(payload).subscribe(res => {
      this._alert.succuss(res);
    }, err => {
      this._alert.error(err);
    })
  }

  choosePlan(e, t) {
    this.currentSelection = t;
  }

  GetIndianEmpInsuranceDtls() {
    this.isLoading = true;
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetIndianEmpInsuranceDtls(payload).subscribe(res => {
      this.eMPInsuranceInfo = res;
      this.isLoading = false;
    })
  }

  GetEMPInsuranceInfo() {
    this.isLoading = true;
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetEMPInsuranceInfo(payload).subscribe(res => {
      this.eMPInsuranceInfo = res;
      this.dataTrns();
      this.isLoading = false;
    })
  }

}



@Component({
  selector: 'InsurenceHistory',
  templateUrl: 'insurence-history.html',
  styleUrls: ['./insurence-history.css']
})

export class InsurenceHistory implements OnInit {
  list: any = [];
  hrAssociates: any = [];
  displayedColumns: string[] = ['avathar', 'empName', 'leaveType', 'fromDate', 'toDate', 'strNumber_of_Days', 'leaveStatusDesc', 'locatioN_NAME', 'dateOfJoining'];
  loading = false;
  data = new MatTableDataSource();
  resultsLength = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private dialogRef: MatDialogRef<InsurenceHistory>,
    @Inject(MAT_DIALOG_DATA) public mdata: any,
    private profileService: ProfileService,
    private _router: Router,
    private dataService: DataService) {
    console.log(this.list)
  }
  ngOnInit() {
    this.init()
  }
  filterTable(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  init() {
    this.GetEMPOnboardingDtls();
  }
  checkImage(avatar) {
    if (avatar != null && avatar != undefined && avatar != "null" && avatar != "")
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }
  GetEMPOnboardingDtls() {
    this.loading = true;
    const payload = {
      "Req_Id": "0"
    };
    this.profileService.GetEMPOnboardingDtls(payload).subscribe((res: any) => {
      this.data = new MatTableDataSource(res);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      this.loading = false;
    })
  }
  navigate(e, row) {
    e.preventDefault();
    this.closePopup();
    localStorage.setItem("new-entry-data", JSON.stringify(row))
    this._router.navigate(['hr-new-associates']);
  }
  closePopup() {
    this.dialogRef.close();
  }

  formatDate(date) {
    try {
      return this.dataService.dateFormatter(date, "MM/dd/yy");
    } catch (e) { }
    return date;
  }
}

