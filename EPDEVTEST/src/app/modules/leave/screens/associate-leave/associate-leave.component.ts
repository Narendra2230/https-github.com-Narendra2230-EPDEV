import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-associate-leave',
  templateUrl: './associate-leave.component.html',
  styleUrls: ['./associate-leave.component.css']
})
export class AssociateLeaveComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'avathar', 'empName', 'leaveType', 'fromDate', 'toDate', 'strNumber_of_Days', 'leaveStatusDesc'];

  showDropDown = false;
  list: any = [];
  checkedlist: any = [];
  isLoading = false;
  leaveTypes: any = [];
  remoteTyps: any = [];
  data = new MatTableDataSource();
  resultsLength = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  filter = {
    status: [],
    all: false,
    withdraw: false,
    inprogress: false,
    approved: false,
    rejected: false,
    toDate: "",
    fromDate: "",
    type: []
  }
  statusList = [{
    label: "All",
    value: null
  }, {
    label: "In Progress",
    value: "1"
  }, {
    label: "Approved",
    value: "2"
  }, {
    label: "Rejected",
    value: "3"
  }, {
    label: "WithDrawn",
    value: "4"
  }];
  leaveTyps = [];
  onLeaves = [];
  constructor(
    private _service: LeaveService,
    private _session: SessionServiceService,
    private dataService: DataService,
    private _cservic: ConfirmationService,
    private _alert: AlertMessageService) { }



  ngOnInit() {
    this.managerLeaveView();
    this.getLeaveTypes();
    this.getRemoteTypes();
    this.associatesOnLeave();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    //  if(this.showDropDown){
    //    this.showDropDown = false;
    //  }
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.page.subscribe((event) => console.log(event))

  }

  formatDate(date) {
    try {
      return this.dataService.dateFormatter(date, "MM/dd/yy");
    } catch (e) { }
    return date;
  }


  managerLeaveView() {
    this.isLoading = true;
    const payload = {
      "mgrEmpId": this._session.getUserID(),
      "leaveTypeId": null,
      "leaveStatus": 1,
      "fromDate": null,
      "toDate": null
    }
    this._service.managerLeaveView(payload).subscribe(res => {
      this.list = res;
      this.isLoading = false;

      this.resultsLength = this.list.length;
      this.data = new MatTableDataSource(this.list);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;

    }, err => {
      this.isLoading = false;
      this._alert.error(err.error.message);
  })
  }
  getRemoteTypes() {
    const payload = {
      EMPID: this._session.getUserID(),
      "isRemote": true
    }
    this._service.GetLeaveTypes(payload).subscribe(res => {
      this.remoteTyps = res;
      this.leaveTyps = (this.leaveTypes.concat(this.remoteTyps));
      this.leaveTyps = this.unique(this.leaveTyps.map(e => ({ label: e.leave_Type, value: e.leaveTypeId })));
    }, err => [

    ])
  }

  unique(arr){
   const u = arr.map(item => item.value).filter((value, index, self) => self.indexOf(value) === index);
   return u.map(s=>arr.find(e=>e.value ==s ));

  }

  checkImage(avatar){
    if(avatar!= null && avatar!=undefined && avatar != "null" && avatar!="" )
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }

  getLeaveTypes() {
    const payload = {
      EMPID: this._session.getUserID(),
      "isRemote": false
    }
    this._service.GetLeaveTypes(payload).subscribe(res => {
      this.leaveTypes = res;
      this.leaveTyps = (this.leaveTypes.concat(this.remoteTyps));
      this.leaveTyps = this.unique(this.leaveTyps.map(e => ({ label: e.leave_Type, value: e.leaveTypeId })));
    }, err => [

    ])
  }
  associatesOnLeave() {
    const payload = {
      EMPID: this._session.getUserID()
    }
    this._service.associatesOnLeave(payload).subscribe((res:any) => {
      this.onLeaves = res;
    }, err => [

    ])
  }
  onFilter() {
    let { all, approved, toDate, fromDate, inprogress, rejected, withdraw, status, type } = this.filter;
    console.log({ all, approved, toDate, fromDate, inprogress, rejected, withdraw })
    this.isLoading = true;
    const payload = {
      "mgrEmpId": this._session.getUserID(),
      // "leaveTypeId": type[0] ? type[0] : 0,
      "leaveTypeId": type[0] ? type.join(",") : null,
      "fromDate": fromDate ? this.dataService.dateFormatter(fromDate, "yyyy-MM-dd") : null,
      "toDate": toDate ? this.dataService.dateFormatter(toDate, "yyyy-MM-dd") : null,
      // "leaveStatusId": status[0] ? status[0] : 0,
      "leaveStatus": status[0] ? status.join(",") : null
    }
    this._service.managerLeaveView(payload).subscribe(res => {
      this.list = res;
      this.isLoading = false;
      this.resultsLength = this.list.length;
      this.data = new MatTableDataSource(this.list);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    }, err => {
      this._alert.error(err.error.message);
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
      status: [],
      type: []
    };
    this.managerLeaveView();
  }


  checkCount(e, i) {
    let index = this.list.findIndex(u=>u.leaveId == e['leaveId'] && u.empId == e['empId']);
    this.list[index]['isChecked'] = !this.list[index]['isChecked'];
    this.list = this.list;
  }



  leaveApprove(status) {
    var txtMsg = "";
    this.checkedlist = this.list.filter(x => x.isChecked === true);
    if(this.checkedlist.length===0)  {
      this._alert.error('Please select atleast one Employee..!');
      return;
    }
    if(status===3){
      txtMsg = "Are you sure you want to Reject the selected Request(s)?";
    }else{
      txtMsg = "Are you sure you want to Approve the selected Request(s)?";
    }

    this._cservic.confirm({
      message: txtMsg,
      accept: () => {
        const payload: any = [];
        this.isLoading = true;
        this.checkedlist.forEach(row => {
          payload.push({
            "empId": row.empId,
            "leaveId": row.leaveId,
            "leaveTypeId": row.leaveTypeId,
            "leaveType": row.leaveType,
            "fromDate": row.fromDate,
            "toDate": row.toDate,
            "leaveStatus": status
          });
        });


        this._service.actionOnLeave(payload).subscribe((res: any) => {
          this._alert.succuss(res[0]['message']);
          this.managerLeaveView();
          this.isLoading = false;
        }, err => {
          this._alert.error(err.error.message);
          this.isLoading = false;
        })
      }
    });
  }


  checkAll(event) {
    this.list.filter(a => a.leaveStatus == 1).forEach(element => {
      element['isChecked'] = event.target.checked;
    });
    this.resultsLength = this.list.length;
    this.data = new MatTableDataSource(this.list);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }
}
