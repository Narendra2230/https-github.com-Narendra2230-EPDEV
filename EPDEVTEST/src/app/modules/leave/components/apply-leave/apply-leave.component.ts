import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { getLocaleTimeFormat } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  holidays: any = [];
  leaveBalance: any = [];
  leaveTypes: any = [];
  remoteTyps: any = [];
  optionalHolidays: any = [];
  reasonsForLeave: any = [];
  reasonsForRemote: any = [];
  reasons: any = [];
  loading =  false;
  forLeave = false;
  @Output() refreshSheet = new EventEmitter();
  @Output() setTypes = new EventEmitter();
  leaveRequest = {
    "empId": this._session.getUserID(),
    "leaveId": "",
    "leaveTypeId": "null",
    "leaveType": "",
    "fromDate": "",
    "toDate": "",
    "reasonId": "null",
    "reasonDesc": "",
    "emergancyContactNumber": "000000000000",
    "comments": "",
    "notes": "",
    "optionalHolidayId": "",
    "OODuration": "",
    "AttachmentPath": "",
    "optionalholidays": [],
    "hourse": "",
    "source": "",
    "destination": ""
  }
  maxDateValue = new Date();
  minDateValue = new Date();
  oHolidays = [];
  showTypes = false;
  associateLeaveBalance:any = {};
  leaveBalanceDetails = [];
  canApplyOptionHoliday  = 0;
  encashLeaveForm:any;
  successMessage;
  errorMessage;
  remainingLeave;
  leaveDropDown = [];
  encashEligible = false;
  loader = false;
  constructor(private dialog: MatDialog, @Inject(MatDialog) public data: any,
    private _service: LeaveService,
    private _alert: AlertMessageService,
    private _session: SessionServiceService,
    private dataService: DataService,
    private fb: FormBuilder
    ) {
    this.showTypes = this._session.getUserLocation() == 'India';
  }
  checkHideAndShow(type) {
    // 1,2,3,5
    //4,6,7,8
    const { leaveTypeId } = this.leaveRequest;
    if (leaveTypeId == 'null') return false;
    // CL - fd,td,rs,ph,cmt, 2   - donne
    // OPtHoli - OPtHoli Drop dow  5   - donne
    // HPD- Date, Rs, ph,10
    // WFH -  FD,TD, Re, Phm Comments   4
    // Login from HOme -  Date, Hours, ph, Reason 7
    // oTravel:fr,t,s,d,ph,rs,  -  8
    //Sick Leave-1
    //Loss of Pay- 3
    ////On Official Duty 6
    // HPDwithoutpay-  Date,res,pho,commets

    // MT-   fr,td, phm, att, nonnne, note
    if (type == 'fromDate') {
      return ['2', '4', '8', '1', '3', '6', '9', '12','13'].includes(leaveTypeId);
    }
    if (type == 'toDate') {
      return ['2', '4', '8', '1', '3', '6', '9','12','13'].includes(leaveTypeId);
    }
    if (type == 'phone') {
      return ['2', '10', '4', '7', '8', '1', '3', '6'].includes(leaveTypeId);
    }
    if (type == 'source') {
      return ['8'].includes(leaveTypeId);
    }
    if (type == 'destination') {
      return ['8'].includes(leaveTypeId);
    }
    if (type == 'reasonId') {
      return ['2', '10', '7', '8', '1', '3', '6', '4','12','13'].includes(leaveTypeId);
    }
    if (type == 'comments') {
      return ['2', '4', '1', '3', '6'].includes(leaveTypeId);
    }
    if (type == 'date') {
      return ['10', '7'].includes(leaveTypeId);
    }
    if (type == 'hourse') {
      return ['7'].includes(leaveTypeId);
    }
    if (type == 'optionalholidays') {
      return ['5'].includes(leaveTypeId);
    }
    if (type == 'note') {
      return ['9'].includes(leaveTypeId);
    }
    return true;
  }
 
  getReasonsBasedOnType() {
    // isLeave
    if (!this.forLeave)
      return this.reasonsForLeave;
    else
      return this.reasonsForRemote
  }
  getYesterdaysDate() {
    const today = new Date()
    const yesterday = new Date(today)
    
    yesterday.setDate(yesterday.getDate() - 1)
    
   return yesterday;
}
  getStartDateAndEndDate(type,field){
    const {fromDate} = this.leaveRequest;
    if(type=='maxDate'){     
      if(this.leaveRequest.leaveTypeId == '4'){
        return new Date();
      }
      if(this.leaveRequest.leaveTypeId == '7'){
        if(field == 'S'){
          return new Date();
        }
      }
    }
    if(type == 'minDate'){
      if(field == 'E'){
        return fromDate ? fromDate : new Date();
      }
      if(this.leaveRequest.leaveTypeId == '7'){
        if(field == 'S'){
          console.log(this.getYesterdaysDate())
          return this.getYesterdaysDate();
        }
      }
    }
    return null;
  }


  ngOnInit() {
    this.getLeaveTypes();
    this.getLeaveBalance();
    this.getHolidays();
    this.getRemoteTypes();
    this.getReasonsForLeave();
    this.getReasonsForRemote();
    this.getOptionalHolidays();
    this.getAssociateLeaveBalance();
    this.getLeaveBalanceDetails();
    let date1 = new Date().getTime();
    let date2 = new Date(this._session.getDateOfJoining()).getTime()
    if((date1 - date2)/(1000 * 3600 * 24) > 240){
      this.encashEligible = true
    }
    else{
      this.errorMessage = "You should be atleast 240 days in organization to encash leaves!"
    }
    if(this._session.getUserLocation() != "India"){
      this.encashEligible = false;
      this.errorMessage = "Only people in India can encash Leaves!";
    }
    this.encashLeaveForm = this.fb.group({
      Emp_Id:[this._session.getUserID()],
      CashEncashmentLeaves:['',[Validators.required]]
    })
  }

  submit(){
    console.log(this.encashLeaveForm.value)
    this.loader = true
      this._service.encashLeaves(this.encashLeaveForm.value).subscribe(
        (response:any)=>{
          this.successMessage = response;
          this.getAssociateLeaveBalance()
        },
        (errorResponse)=>{
          this.errorMessage = errorResponse
          console.log(errorResponse)
        }
      ).add(()=>{
        this.loader=false
      })
    setTimeout(()=>{
      this.successMessage = null;
      $('#enCashModal').modal('hide');
      if(this.encashEligible){
        this.errorMessage = null;
      }
    },3000)
  }

  remainingLeaves(data){
    this.remainingLeave = (this.associateLeaveBalance.earnedLeave - data).toString()
  }

  leaveTypeChange() {
    this.leaveRequest = {
      "empId": this._session.getUserID(),
      "leaveId": "",
      "leaveTypeId": this.leaveRequest.leaveTypeId,
      "leaveType": "",
      "fromDate": "",
      "toDate": "",
      "reasonId": "null",
      "reasonDesc": "",
      "emergancyContactNumber": "0000000000",
      "comments": "",
      "notes": "",
      "optionalHolidayId": "",
      "OODuration": "",
      "AttachmentPath": "",
      "optionalholidays": [],
      "hourse": "",
      "source": "",
      "destination": ""
    };
    this.resetOptionalHolidays();
    if (!this.forLeave)
        this.getReasonsForLeaveType();
    else
        this.getReasonsForRemoteType();
    
  }

  getReasonsForLeaveType() {
    const payload = {
      EMPID: this._session.getUserID(),
      isLeave: true,
      LeaveTypeId :this.leaveRequest.leaveTypeId
    }
    this._service.GetReasons(payload).subscribe(res => {
      this.reasonsForLeave = res;
    }, err => [

    ])
  }

  getReasonsForRemoteType() {
    const payload = {
      EMPID: this._session.getUserID(),
      isLeave: false,
      LeaveTypeId :this.leaveRequest.leaveTypeId
    }
    this._service.GetReasons(payload).subscribe(res => {
      this.reasonsForRemote = res;
    }, err => [

    ])
  }

  getHolidays() {
    const payload = {
      EMPID: this._session.getUserID()
    }
    this._service.GetHolidayList(payload).subscribe(res => {
      this.holidays = res;
    }, err => [

    ])
  }

  getRemoteTypes() {
    const payload = {
      EMPID: this._session.getUserID(),
      "isRemote": true
    }
    this._service.GetLeaveTypes(payload).subscribe(res => {
      this.remoteTyps = res;
      this.setTypes.emit(this.leaveTypes.concat(this.remoteTyps));
    }, err => [

    ])
  }
  resetOptionalHolidays(){
    const { oHolidays } = this;
    oHolidays.forEach(e => (!e.disabled) ? e.selected = false : '');
    this.oHolidays = oHolidays;
  }
  changed(e, index) {
    const { oHolidays } = this;
    oHolidays.forEach(e => (!e.disabled) ? e.selected = false : '');
    oHolidays[index]['selected'] = true;
    this.leaveRequest.optionalholidays = oHolidays.filter(e=>(!e.disabled && e.selected)).map(e=>e.date)
    this.oHolidays = oHolidays;
  }
  getLeaveStr(str) {
    let selected = this.oHolidays.filter(e=>(!e.disabled && e.selected)).map(e=>e.label);
    if(selected.length == 0) return "Select";
     return selected.join();
  }

  getOptionalHolidays() {
    const payload = {
      EMPID: this._session.getUserID()
    }
    this._service.getOptionalHoliday(payload).subscribe(res => {
      this.optionalHolidays = res;
      ///filter(h => !h.employeeOpted)
      const len = this.optionalHolidays.filter(h => h.employeeOpted).length;
      this.canApplyOptionHoliday =   this.optionalHolidays.filter(h => h.employeeOpted).length ;
      this.oHolidays = this.optionalHolidays.map(h => ({
        label: h.occasion, date: h.holidayDate,
        value: h.id + '',
        selected: h.employeeOpted ? true : false,
        disabled: h.employeeOpted ? true : false,
      }));

      this.leaveRequest.optionalholidays = this.optionalHolidays.filter(h => h.employeeOpted).map(s => s.id + '')   
      // console.log( this.leaveRequest.optionalholidays)
    }, err => [

    ])
  }

  getAssociateLeaveBalance() {
    const payload = {
      EMPID: this._session.getUserID()
    }
    this._service.associateLeaveBalance(payload).subscribe((res: any) => {
      console.log(res)
      this.associateLeaveBalance = res[0] || {};
      let count = res[0].earnedLeave
      if(res[0].elEncashed == false){
      if(count <= 8){
      this.leaveDropDown = []
      for(let i=0;i<count;i++){
        this.leaveDropDown.push(i+1)
      }
      if(this.leaveDropDown.length == 0){
        this.encashEligible = false;
        this.errorMessage = "You have no earned leaves"
      }
    }
    else{
      this.leaveDropDown = [1,2,3,4,5,6,7,8]
    }
  }
  else{
    this.encashEligible = false
    this.errorMessage = "You already encashed leaves this year"
  }
    this.encashLeaveForm.controls['CashEncashmentLeaves'].reset();
    this.encashLeaveForm.controls['CashEncashmentLeaves'].setValue(' ')
    }, err => [

    ])
  }
  getLeaveBalanceDetails() {
    const payload = {
      EMPID: this._session.getUserID()
    }
    this._service.leaveBalanceDetails(payload).subscribe((res: any) => {
      this.leaveBalanceDetails = res;
    }, err => [

    ])
  }



  getLeaveBalance() {
    const payload = {
      EMPID: this._session.getUserID()
    }
    // this._service.getAssociateLeaveDetails(payload).subscribe(res => {
    //   this.leaveBalance = res;
    // }, err => [

    // ])
  }

  getLeaveTypes() {
    const payload = {
      EMPID: this._session.getUserID(),
      "isRemote": false
    }
    this._service.GetLeaveTypes(payload).subscribe(res => {
      this.leaveTypes = res;
      this.setTypes.emit(this.leaveTypes.concat(this.remoteTyps));
    }, err => [

    ])
  }

  getReasonsForLeave() {
    const payload = {
      EMPID: this._session.getUserID(),
      isLeave: true
    }
    this._service.GetReasons(payload).subscribe(res => {
      this.reasons = this.reasonsForLeave.concat(this.reasonsForRemote);
      this.reasonsForLeave = res;
    }, err => [

    ])
  }

  getReasonsForRemote() {
    const payload = {
      EMPID: this._session.getUserID(),
      isLeave: false
    }
    this._service.GetReasons(payload).subscribe(res => {
      this.reasons = this.reasonsForLeave.concat(this.reasonsForRemote);
      this.reasonsForRemote = res;
    }, err => [

    ])
  }

  formatDate(date){
    try{
      return this.dataService.dateFormatter(date, "MM/dd/yy") ;
    }catch(e){}
    return date;
  }

  changeType() {
    this.reset();
  }

  doValidation(leaveRequest){
      try{
        const  fields  = {
          "1":['fromDate','toDate','reasonId'],
          "2":['fromDate','toDate','reasonId'],
          "3":['fromDate','toDate','reasonId'],
          "4":['fromDate','toDate','reasonId'],
          "5":['fromDate'],
          "6":['fromDate','toDate','reasonId'],
          "7":['fromDate','OODuration','reasonId'],
          "8":['fromDate','toDate','reasonId'],
          "9":['fromDate','toDate'],
          "10":['fromDate','reasonId'],
        }
        if(fields[leaveRequest.leaveTypeId]){
        return fields[leaveRequest.leaveTypeId].every(f =>
            leaveRequest[f] !="null" &&
            leaveRequest[f] !="" &&
            leaveRequest[f] !=undefined &&
            leaveRequest[f] !=null);
        }
    }catch(ex){}
    return true;
  }


  postAssociateLeaveDtls() {
    const leaveRequest = JSON.parse(JSON.stringify(this.leaveRequest));
    leaveRequest.reasonDesc = (this.reasons.find(r => r.reasonId == leaveRequest.reasonId) || {})['reasonName'];
    leaveRequest.leaveType = (this.leaveTypes.find(r => r.leaveTypeId == leaveRequest.leaveTypeId) || {})['leave_Type']
    if (this.forLeave) {
      leaveRequest.leaveType = (this.remoteTyps.find(r => r.leaveTypeId == leaveRequest.leaveTypeId) || {})['leave_Type']
    }
    leaveRequest.fromDate = this.dataService.dateFormatter(leaveRequest.fromDate, "MM/dd/yyyy");
    leaveRequest.toDate = this.dataService.dateFormatter(leaveRequest.toDate, "MM/dd/yyyy");
    if (leaveRequest.leaveTypeId == 5) {
      leaveRequest.fromDate = this.dataService.dateFormatter((leaveRequest.optionalholidays || []).join(), "MM/dd/yyyy");
      leaveRequest.toDate = this.dataService.dateFormatter((leaveRequest.optionalholidays || []).join(), "MM/dd/yyyy");
      // leaveRequest.optionalHolidayId = (leaveRequest.optionalholidays || []).join(",")
    }
    if(!this.doValidation(leaveRequest)){
      this._alert.error("Please fill mandatory information");
      return;
    }
    this.loading = true;
    const payload = [leaveRequest]
    this._service.postAssociateLeaveDtls(payload).subscribe(res => {
      console.log(res)
      this.refreshSheet.emit({});
      this.getAssociateLeaveBalance();
      this.getOptionalHolidays();
      let message=(res[0] || {}).message || 'Successfully';
      this._alert.succuss(message);
      this.reset();
      this.loading = false;
    }, err => {
      this.loading = false;
      this._alert.error(err.error.message)
    })
  }

  reset() {
    this.leaveRequest = {
      "empId": this._session.getUserID(),
      "leaveId": "",
      "leaveTypeId": "null",
      "leaveType": "",
      "fromDate": "",
      "toDate": "",
      "reasonId": "null",
      "reasonDesc": "",
      "emergancyContactNumber": "0000000000",
      "comments": "",
      "notes": "",
      "optionalHolidayId": "",
      "OODuration": "",
      "AttachmentPath": "",
      "optionalholidays": [],
      "hourse": "",
      "source": "",
      "destination": ""
    };
    this.resetOptionalHolidays();
  }

  managerLeaveView() {
    const payload = {
      "mgrEmpId": this._session.getUserID(),
      "leaveTypeId": null,
      "leaveStatus": null,
      "fromDate": null,
      "toDate": null
    }
    this._service.managerLeaveView(payload).subscribe(res => {
    }, err => [
      alert(JSON.stringify(err.error))
    ])
  }




  openleaveblanceDialog() {
    const dialogRef = this.dialog.open(LeaveBlancePopup, { data: { list: this.leaveBalanceDetails }, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openHolidayCalanderDialog() {
    const data = this.holidays.concat([]);
    const dialogRef = this.dialog.open(HolidayCalanderDialog, { data: { list: data }, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




}
//LeaveBlancePopup
@Component({
  selector: 'leaveblance',
  templateUrl: 'leaveblance.component.html',
  styleUrls: ['./apply-leave.component.css']
})

export class LeaveBlancePopup {
  list: any = [];
  constructor(
    private dialogRef: MatDialogRef<LeaveBlancePopup>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dataService: DataService) {
    this.list = data.list;
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



//HolidayCalanderDialog
@Component({
  selector: 'holidaycalander',
  templateUrl: 'holidaycalander.component.html',
  styleUrls: ['./apply-leave.component.css']
})

export class HolidayCalanderDialog {
  list: any = [];
  constructor(private dialogRef: MatDialogRef<HolidayCalanderDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  private dataService: DataService) {
    this.list = data.list;
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