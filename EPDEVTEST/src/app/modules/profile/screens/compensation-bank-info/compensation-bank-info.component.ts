import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { AlertMessageService } from './../../../../services/alert-message.service';

@Component({
  selector: 'app-compensation-bank-info',
  templateUrl: './compensation-bank-info.component.html',
  styleUrls: ['./compensation-bank-info.component.css']
})
export class CompensationBankInfoComponent implements OnInit {
  currentTab = "CMP";
  current_empID: any;
  empCompensationDtls: any = [];
  empBankDtls: any = {};
  userType: any;
  public isLoading1 = false;
  public isLoading2 = false;
  privileges: any = [];
  validationFields: any = [];
  errorMessages: {} = {};
  metaData: any = [];
  isUSEmployee: boolean = false;
  constructor(private active_route: ActivatedRoute,
    private _http: HttpClient,
    private profileService: ProfileService,
    private _alert: AlertMessageService,
    private dataService: DataService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService) {
    this.userType = this.active_route.snapshot.params['userType'];
    this.current_empID =  this.encryptionService.deCryptEmpID(this.active_route.snapshot.params['empID']);
  }
  getValidationFile() {
    this._http.get('assets/json/validations.json').subscribe(res => {
      this.validationFields = res;
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

  openHistory(e) {
    e.preventDefault()
    const dialogRef = this.dialog.open(CompensationHistory, { data: { id: this.current_empID }, disableClose: true });
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

  getMetaValues(type) {
    try {
      const { metaData } = this;
      const data = metaData.find(e => e.type == type);
      return data.values;
    } catch (e) {

    }
    return [];
  }

  ngOnInit() {
    this.getPrivilegeFile();
    this.getValidationFile();
    this.GetEmpCompensationDtls();
    this.GetEmpBankDtls();
    this.GetDropDownValues();
    let to = this.active_route.snapshot.queryParams["to"];
    if (to) this.currentTab = to;
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
  
  empCompenDtls(empCD) {
    for (var i = 0; i < empCD.length; i++) {
      empCD[i].effectiveFrom = empCD[i].effectiveFrom ? this.dataService.dateFormatter(empCD[i].effectiveFrom, "yyyy-MM-dd") : null;
    }
    this.empCompensationDtls = empCD;
  }
  GetEmpCompensationDtls() {
    this.isLoading1 = true;
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetEmpCompensationDtls(payload).subscribe(res => {
      this.empCompenDtls(res);
      // this.empCompensationDtls = res || {};
      this.isLoading1 = false;
    })
  }
  PostEmpCompensationDtls() {
    if (this.doValidations('compensation', this.empCompensationDtls[0])) {
      this._alert.error("Please complete all required fields..!");
      return;
    }
    this.isLoading1 = true;
    const payload = {
      ...this.empCompensationDtls[0],
      empId: this.current_empID,
    };
    this.profileService.PostEmpCompensationDtls(payload).subscribe(res => {
      this._alert.succuss(res);
      this.isLoading1 = false;
    }, err => {
      this._alert.error("Oops..!");
      this.isLoading1 = false;
    })
  }

  getPrivilegeFile() {
    this._http.get('assets/json/privileges.json').subscribe(res => {
      this.privileges = res;
    })
  }


  checkPreviligies(field) {
    // try{
    let type = 'USER';
    if (this.userType == 'manager'  || this.userType == 'finance') type = 'MANAGER';
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


  GetDropDownValues() {
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetDropDownValues(payload).subscribe(res => {
      this.metaData = res;
    })
  }

  GetEmpBankDtls() {
    this.isLoading2 = true;
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetEmpBankDtls(payload).subscribe(res => {
      this.empBankDtls = res || {};
      this.isLoading2 = false;
    })
  }
  tabClick(type, e) {
    e.preventDefault();
    this.currentTab = type;
  }
  getMSal(v) {
    try {
      return parseFloat('' + (v / 12)).toFixed(2);
    } catch (ex) { }
    return 0;
  }
  postEmpBankDtls() {
    // if (this.doValidations('personalInfo', this.empBankDtls)) {
    //   this._alert.error("Please complete all required fields..!" + this.errorMessages);
    //   return;
    // }
    this.isLoading2 = true;
    const payload = {
      empId: this.current_empID,
      ...this.empBankDtls,
      "branchName": "",
      "bankAddress": ''
    };
    if (!payload['bankId']) payload['bankId'] = 0;
    this.profileService.PostEmpBankDtls(payload).subscribe(res => {
      this._alert.succuss(res);
      this.isLoading2 = false;
    }, err => {
      this._alert.error("Oops..!");
      this.isLoading2 = false;
    })
  }

}



@Component({
  selector: 'CompensationHistory',
  templateUrl: 'compensation-history.html',
  styleUrls: ['./compensation-history.css']
})

export class CompensationHistory implements OnInit {
  list: any = [];
  hrAssociates: any = [];
  displayedColumns: string[] = ['payType','salary','ogpb','monthlySalary','monthlyOGPB','effectiveFrom'];
  loading = false;
  data = new MatTableDataSource();
  resultsLength = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private dialogRef: MatDialogRef<CompensationHistory>,
    @Inject(MAT_DIALOG_DATA) public mdata: any,
    private profileService: ProfileService,
    private _router: Router,
    private dataService: DataService) {
    // console.log(this.list)
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
      "EmpId": this.mdata['id']
    };
    this.profileService.GetEmpCompensationHistDtls(payload).subscribe((res: any) => {
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