import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { type } from 'os';

@Component({
  selector: 'app-manager-details',
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.css']
})
export class ManagerDetailsComponent implements OnInit {
  @ViewChild('timesheetAssociateDataCmpt', { static: true }) eltimesheetAssociateDataCmpt: ElementRef;
  public timesheetAssociateData = [];
  public associates = [{}, {}, {}, {}]
  public mangerDashboardData = [];
  public filterMetaData = [];
  public managerMetaData = [];
  public chartData = [];
  public globalDates = {};
  public globalDateRange = [];
  public isLoading = false;
  public datesObject = {};
  public globalMoth = '0';
  public globalYear = '2020';
  public currentDataSource = [];
  public timesheetManagerAssociatePendingData = [];
  public managerData = {};
  public display = false;
  public rejectComments = '';
  public isRCmtError = false;
  public isHideEle = false;
  constructor(private dialog: MatDialog, private _router: Router, private _service: TimesheetService,
    private dataService: DataService, private _session: SessionServiceService,
    private _cservic: ConfirmationService, private messageService: MessageService) {
      let hideCTAs =   sessionStorage.getItem("hideCTAs");
      if(hideCTAs=='true'){
        this.isHideEle = true;
      }
     }
  ngOnInit() {
    this.managerData = this._session.getSelectedEmpDetails();
    this.getGlobalDates();
    window.scrollTo(0, 0);
  }

  resetDates() {
    this.getGlobalDates();
  }

  apporvePopup() {
    this.openDialog();

  }
  getGlobalDates() {
    this.globalDates = this._session.getSelectedGlobalTimeDetails();
    this.datesObject = this.globalDates;
    this.init();
    // this._service.GetglobalDate({}).subscribe(data => {
    //   this.globalDates = data;
    //   this.datesObject=data;
    //   this.init();
    // })
  }
  init() {
    this.getEmpDetails();
    let startDate = this.dataService.dateFormatter(new Date(this.globalDates['startDate']), 'MM/dd/yyyy');//new Date();
    let endDate = this.dataService.dateFormatter(new Date(this.globalDates['endDate']), 'MM/dd/yyyy');// new Date();
    this.globalDateRange = [startDate, endDate];
  }


  onGlobalDateChange(dates) {
    // 2020-03-26
    this.globalDates['startDate'] = this.dataService.dateFormatter(dates[0], "yyyy-MM-dd") + 'T00:00:00';
    this.globalDates['endDate'] = this.dataService.dateFormatter(dates[1], "yyyy-MM-dd") + 'T00:00:00';
    this.getEmpAllDetails();
  }

  getStatus(type) {
    let status = 0;
    switch (type) {
      case "In Progress":
        status = 0
        break;
      case "Approved":
        status = 1
        break;
      case "Rejected":
        status = 2
        break;
    }
    return status;
  }

  getEmpDetails() {
    let payload =
    {
      "StartDate": this.managerData['startDate'],// ? null : this.dataService.dateFormatter(this.datesObject['startDate'], "yyyy-MM-dd"),
      "EndDate":  this.managerData['endDate'], // ? null : this.dataService.dateFormatter(this.datesObject['endDate'], "yyyy-MM-dd"),
      "TimesheetStatus": this.getStatus(this.managerData['timesheetStatus']),  //0 pending 1-approved 3-rejected 
      "IsSearch": this.managerData['isSearch'],  // if search is true send  month and year 
      "Month": this.managerData['month'], //null,
      "Year": this.managerData['year'], // null
      "SOWID": this.managerData['msowId'],
      "CustomerId": this.managerData['customer'],
      "Emp_id": this.managerData['associatePrimaryId'],
      "Hours": this.managerData['totalHours'],
      "IsTotalView": false,   //to view independent data  of associate 
      'Report_Manager_Id':this._session.getUserID(),
      "IsClickView" :false,
      "approver":this.managerData['approver'],
      "isLevel2Approval":this.managerData['isLevel2Approval']
    }
    if(this.isHideEle){
      payload =
      {
        "StartDate": this.managerData['startDate'],//this.dataService.dateFormatter(this.datesObject['startDate'], "yyyy-MM-dd"),
        "EndDate":  this.managerData['endDate'], // this.dataService.dateFormatter(this.datesObject['endDate'], "yyyy-MM-dd"),
        "TimesheetStatus": this.getStatus(this.managerData['timesheetStatus']),  //0 pending 1-approved 3-rejected 
        "IsSearch": false,  // if search is true send  month and year 
        "Month": this.managerData['month'], //null,
        "Year": this.managerData['year'], // null
        "SOWID": this.managerData['msowId'],
        "CustomerId": this.managerData['customer'],
        "Emp_id": this.managerData['associatePrimaryId'],
        "Hours": this.managerData['totalHours'],
        "IsTotalView": false,   //to view independent data  of associate 
        'Report_Manager_Id':this._session.getUserID(),
        "IsClickView" :true,
        "approver":this.managerData['approver'],
        "isLevel2Approval":this.managerData['isLevel2Approval']
      }
    }
    /*{
      "StartDate": "2020-03-01",
      "EndDate": "2020-03-21",
      "TimesheetStatus": "0",
      "IsSearch": false,
      "Month": null,
      "Year": null,
      "SOWID": "1062",
      "CustomerId": "385",
      "Emp_id": "2943",
      "Hours": "60",
      "IsTotalView": false,
    } */
    // const data = [{ "id": 374317, "dateofReport": "2020-03-02T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374318, "dateofReport": "2020-03-03T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374319, "dateofReport": "2020-03-04T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374320, "dateofReport": "2020-03-05T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374321, "dateofReport": "2020-03-06T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374322, "dateofReport": "2020-03-07T00:00:00", "activity": "Development", "comment": "", "duration": "00:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374323, "dateofReport": "2020-03-08T00:00:00", "activity": "Development", "comment": "", "duration": "00:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374324, "dateofReport": "2020-03-09T00:00:00", "activity": "Development", "comment": "", "duration": "00:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374325, "dateofReport": "2020-03-10T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374326, "dateofReport": "2020-03-11T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374327, "dateofReport": "2020-03-12T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374328, "dateofReport": "2020-03-13T00:00:00", "activity": "Development", "comment": "", "duration": "08:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374329, "dateofReport": "2020-03-14T00:00:00", "activity": "Development", "comment": "", "duration": "00:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }, { "id": 374330, "dateofReport": "2020-03-15T00:00:00", "activity": "Development", "comment": "", "duration": "00:00", "tStatus": "InProgress", "attachDocument": "", "sowName": "STPL - Enterprise Portal", "clientName": "IP/POC", "allocationstatus": "IP/POC", "hours": 60, "document": "" }];
    this._service.ViewManagerTimesheetAssociateData(payload).subscribe((res: any) => {
      this.timesheetAssociateData = res || [];
      this.timesheetAssociateData = res.map(t => ({
        ...t,
        dateStr: this.dataService.dateFormatter(new Date(t.dateofReport), "EEE, MMM d, y")
      }));
    }, err => {

    });
  }

  getEmpAllDetails() {
   
    const payload =
    {
      "StartDate": this.dataService.dateFormatter(this.datesObject['startDate'], "yyyy-MM-dd"),
      "EndDate": this.dataService.dateFormatter(this.datesObject['endDate'], "yyyy-MM-dd"),
      "TimesheetStatus": null, //this.getStatus(this.managerData['timesheetStatus']),  //0 pending 1-approved 3-rejected 
      "IsSearch": this.isHideEle ? true : false,  // if search is true send  month and year 
      "Month": this.dataService.dateFormatter(this.datesObject['startDate'], "MM"),
      "Year": this.dataService.dateFormatter(this.datesObject['startDate'], "yyyy"),
      "SOWID": this.managerData['msowId'],
      "CustomerId": this.managerData['customer'],
      "Emp_id": this.managerData['associatePrimaryId'],
      "Hours": null, // this.managerData['totalHours'],
      "IsTotalView": false,   //to view independent data  of associate ,
      'Report_Manager_Id':this._session.getUserID(),
      "IsClickView" :true,
      "approver":this.managerData['approver'],
      "isLevel2Approval":this.managerData['isLevel2Approval'],
    }
    this._service.ViewManagerTimesheetAssociateData(payload).subscribe((res: any) => {
      this.timesheetAssociateData = res || [];
      this.timesheetAssociateData = res.map(t => ({
        ...t,
        dateStr: this.dataService.dateFormatter(new Date(t.dateofReport), "EEE, MMM d, y")
      }));
    }, err => {

    });
  }

  goBack() {
    sessionStorage.removeItem("hideCTAs");
    this._router.navigate(['timesheet-team']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ApproveHelpPopup);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  reject() {
    const managerMetaData = this.eltimesheetAssociateDataCmpt['getSelectedData']();
    let selected = managerMetaData.filter(c => c.checked);
    let isREJEcTED = selected.find(s => s.tStatus === 'Rejected');
    if (isREJEcTED) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'You should not selected already Rejected ones' });
      return;
    }
    if (selected.length !== 0) {
      this._cservic.confirm({
        message: 'Are you sure that you want to perform Reject action?',
        accept: () => {
          this.rejectComments = "";
          this.isRCmtError = false;
          this.display = true
        }
      });

    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select the reject dates' });
    }
  }
  onSubmit(status, ManagerComment) {
    const managerMetaData = this.eltimesheetAssociateDataCmpt['getSelectedData']();
    let selected = managerMetaData.filter(c => c.checked);
    if (selected.length !== 0) {
      this._cservic.confirm({
        message: 'Are you sure that you want to perform Approve action?',
        accept: () => {
          this._submit(1, selected);
          this.display = false;
        }
      });

    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'select approved dates' });
    }
  }
  rejectsubmit() {
    const managerMetaData = this.eltimesheetAssociateDataCmpt['getSelectedData']();
    const {rejectComments}=this;
    if(rejectComments === '' || rejectComments === null){
      this.isRCmtError = true;
      return;
    }
    let selected = managerMetaData.filter(c => c.checked);
    this._submit(2, selected);
  }
  _submit(status, selected) {
    this.display = false
    this.isRCmtError = false;
    if (selected.length !== 0) {
      const data = selected.map(s => (
        {
          "TimesheetId": s.id,
          "ApprovalStatus": status,
          "IsLevel2Approval": s['isLevel2Approval'],
          "Approver": s['approver'],
          IndividualComment: this.rejectComments
        }));

      this._service.TimesheetManagerApprove(data).subscribe(data => {
        if (status == '1') {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet Approved Successfully' });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Timesheet Rejected Successfully' });
        }
        this.getEmpDetails();
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'you did not select any timesheet' });
    }
  }

}


@Component({
  selector: 'app-popup',
  templateUrl: './popup.html',
  styleUrls: []
})
export class ApproveHelpPopup implements OnInit {

  ngOnInit() {
  }
}
