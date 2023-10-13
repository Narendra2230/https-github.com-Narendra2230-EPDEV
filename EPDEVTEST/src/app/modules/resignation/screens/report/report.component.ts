import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { DataService } from 'src/app/services/data.service';
import { EsiService } from 'src/app/services/esi/esi.service';
import { ResignationService } from 'src/app/services/resignation/resignation.service';
import { MessageService } from 'primeng/api';
import { AlertMessageService } from 'src/app/services/alert-message.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ResignationComponent implements OnInit, AfterViewInit {
 
  showDropDown = false;
  policyChk = false;
  list: any = [];
  checkedlist: any = [];
  isLoading = false;
  resignation: any = [];
  exitId: any;
  resultsLength = 0;
  empID: any;
  resignationDate: any;
  dateOfLeaving: any;
  contactNumber: any;
  personalEmail:any;
  exitReasons: any = [];
  resignationData: any = [];
  employeeName: '';
  employeeID: any = [];
  designationname: '';
  location: '';
  businessunit:'';
  exitReasonSelect: any ;
  resignationDetails: '';
  associateID: any;
  constructor(
    private _service: ResignationService,
    private _session: SessionServiceService,
    private dataService: DataService,
    private messageService: MessageService,
    private _alert: AlertMessageService) { }

  ngOnInit() {
    this.associateID = this._session.getUserID();
    this.getResignation();
    this.getExitReasons();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
  
  }

  checkCount(s, i) {
   
  }

  ngAfterViewInit() {
  }
  reset() {  }

   getResignation(){
    let payload = {"emp_id": this.associateID};
    this._service.GetExitAssociateDetails(payload).subscribe((res: any) => {
      this.resignationData = res[0].lstEmpSOWManager;
      this.employeeName = res[0].employeE_NAME;
      this.designationname = res[0].designationname;
      this.businessunit = res[0].businessunit;
      this.location = res[0].location;
      this.isLoading = false;
      this.resultsLength = this.resignationData.length;
      this.empID = res[0].emp_Id;
      this.employeeID = res[0].employeeID;
      this.dateOfLeaving =  res[0].datE_OF_LEAVING;
      this.contactNumber = res[0].contacT_NUMBER;
      this.personalEmail = res[0].personaL_EMAIL_ID;
      this.exitId = res[0].exitid ? res[0].exitid : null;
      this.resignationDate = res[0].datE_OF_RESIGNATION ? res[0].datE_OF_RESIGNATION : null; 
      this.resignationDetails = res[0].comments ? res[0].comments : null;
      this.exitReasonSelect = res[0].reasonID ? res[0].reasonID : null;
      this.policyChk = res[0].ispolicy ? res[0].ispolicy : false;
    }, err => {
      this.isLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      
    })

  }

  getExitReasons() {
    this._service.GetExitReasons().subscribe((res: any) => {
      this.exitReasons = res;
    })
  }

  PostExitAssociateDetails(){
    let payload = {
      "EMP_ID": this.empID,
      "DATE_OF_LEAVING": this.dateOfLeaving,
      "CONTACT_NUMBER":this.contactNumber,
      "PERSONAL_EMAIL_ID":this.personalEmail,
      "reasonID": this.exitReasonSelect,
      "comments": this.resignationDetails, 
      "designationname": this.designationname,
      "businessunit":this.businessunit,
      "location":this.location,
      "ispolicy":this.policyChk
      
    }
    if(!this.exitId && this.exitReasonSelect && this.resignationDetails){
    this._service.PostExitAssociateDetails(payload).subscribe(res => {
      this._alert.succuss(res);
      this.getResignation();
    })
  }
  }

}
