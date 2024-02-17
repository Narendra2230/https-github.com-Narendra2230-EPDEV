import { Component, OnInit, ViewChild,Input,AfterViewInit, HostListener } from '@angular/core';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplyLeaveComponent } from '../../components/apply-leave/apply-leave.component';
import { DataService } from 'src/app/services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['avathar', 'leaveType', 'fromDate', 'toDate','strNumber_of_Days','leaveStatusDesc','action'];
  exampleDatabase: any[] | null;
  data = new MatTableDataSource();
  headerText = "Apply Leave / Remote Working";
  resultsLength = 0;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;

  selectedValues: string[] = [];
 
  showDropDown = false;
  @ViewChild(ApplyLeaveComponent,{static:true}) applyLeaveComponent: ApplyLeaveComponent;
  leaves: any = [];
  isLoading = false;
  filter = {
    status:[],
    all: false,
    withdraw: false,
    inprogress: false,
    approved: false,
    rejected: false,
    toDate: "",
    fromDate: "",
    type:[]
  }
  statusList = [{
    label:"All",
    value: null
  },{
    label:"In Progress",
    value:"1"
  },{
    label:"Approved",
    value:"2"
  },{
    label:"Rejected",
    value:"3"
  },{
    label:"WithDrawn",
    value:"4"
  }];
  leaveTyps=[];
  constructor(private _service: LeaveService,
    private _session: SessionServiceService,
    private _alert: AlertMessageService,
    private _cservic: ConfirmationService,
    private dataService: DataService,
    private messageService: MessageService) { 
      if(this._session.getUserLocation()!='India'){
        this.headerText = "Apply Leave"
      }
    }

  ngOnInit() {
    this.getAssociateLeaveDetails();
  }
  ngAfterViewInit() {
    
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.page.subscribe((event) => console.log(event))

  }
  @HostListener('document:click', ['$event'])
  clickout(event) {
  //  if(this.showDropDown){
  //    this.showDropDown = false;
  //  }
  }
  setTypes(arr){
    this.leaveTyps = this.unique(arr.map(e=>({label:e.leave_Type,value:e.leaveTypeId})))
  }
  unique(arr){
    const u = arr.map(item => item.value).filter((value, index, self) => self.indexOf(value) === index);
    return u.map(s=>arr.find(e=>e.value ==s )); 
   }

  withDraw(row) {
    this._cservic.confirm({
      message: 'Are you sure you want to withdraw this Request?',
      accept: () => {
        this.isLoading = true;
        const payload = [{
          "empId": this._session.getUserID(),
          "leaveId": row.leaveId,
          "leaveTypeId": row.leaveTypeId,
          "leaveType": row.leaveType,
          "fromDate": row.fromDate,
          "toDate": row.toDate,
          "leaveStatus": "4"
        }];
        this._service.actionOnLeave(payload).subscribe((res: any) => {
          // this.leaves = res;
          // console.log("leaves-->",this.leaves);
          this.isLoading = false;
          //this._alert.succuss("Success");
          let message=(res[0] || {}).message || 'Successfully';
          this.applyLeaveComponent.getAssociateLeaveBalance();
          this.applyLeaveComponent.getOptionalHolidays();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
          this.getAssociateLeaveDetails();
        }, err => {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          //this.messageService.e(JSON.stringify(err));
        })
      }
    });
  }
  check(type, e) {
    const { filter } = this;
    filter[type] = !filter[type];
    alert(JSON.stringify(filter))
    this.filter = filter;
  }
  formatDate(date){
    try{
      return this.dataService.dateFormatter(date, "MM/dd/yy") ;
    }catch(e){}
    return date;
  }
  onFilter() {
    console.log("--==-->>",this.statusList);
    let {all,approved,toDate,fromDate,inprogress,rejected,withdraw,status,type} =   this.filter;
    console.log({all,approved,toDate,fromDate,inprogress,rejected,withdraw})
    this.isLoading = true;
    const payload = {
      "EMPID": this._session.getUserID(),
      // "leaveTypeId": type[0] ? type[0] : 0,
      "leaveTypeId": type[0] ? type.join(",") : null,
      "fromDate": fromDate ? this.dataService.dateFormatter(fromDate, "yyyy-MM-dd") : null,
      "toDate": toDate ? this.dataService.dateFormatter(toDate, "yyyy-MM-dd") : null,
      // "leaveStatus": status[0] ? status[0] : 0,
      "leaveStatus": status[0] ? status.join(",") : null
    }
    this._service.getAssociateLeaveDetails(payload).subscribe((res: any) => {
      this.leaves = res;
      this.isLoading = false;
      this.resultsLength = this.leaves.length;
      this.data = new MatTableDataSource(this.leaves);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;

    }, err => {
      this.isLoading = false;
    })
  }

  reset() {
    this.filter = {
      all: true,
      withdraw: false,
      inprogress: false,
      approved: false,
      rejected: false,
      toDate: "",
      fromDate: "",
      status:[],
      type:[]
    }
    this.getAssociateLeaveDetails();
  }

  getAssociateLeaveDetails() {
    this.isLoading = true;
    const payload = {
      "EMPID": this._session.getUserID(),
      "leaveTypeId": null,
      "fromDate": null,
      "toDate": null,
      "leaveStatus": null
    }
    this._service.getAssociateLeaveDetails(payload).subscribe((res: any) => {
      this.leaves = res;
      this.isLoading = false;
      this.resultsLength = this.leaves.length;
      this.data = new MatTableDataSource(this.leaves);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    }, err => {
      this.isLoading = false;
    })
  }

}
