import { Component, OnInit, Input } from '@angular/core';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';

@Component({
  selector: 'app-project-billing',
  templateUrl: './project-billing.component.html',
  styleUrls: ['./project-billing.component.css']
})
export class ProjectBillingComponent implements OnInit {

  @Input() projects = []

  constructor(private _service: TimesheetService) { }

  ngOnInit() {
    // this.getDetails();
  }
  getDeliveryManagerName = (data = []) => {
    if (data.length === 0) return "---";
    const { firstName = "", lastName = "" } = data[0] || {};
    return `${firstName} ${lastName}`;
  }
  // getDetails(){
  //   const payload={
  //     EmpId:"26"
  //   };
  //   this._service.GetHoursbyEmpBillcycle(payload).subscribe(res=>{
  //     const {billable=[]}= res[0]||{};
  //     console.log(billable)
  //     this.projects=billable;

  //   },err=>{

  //   });
  //   const payload2={
  //     BillingCycle:"3513",
  //     startDate:"2019-12-01",
  //     endDate:"2019-12-24"
  //   }

  //   this._service.GetEmpClientProjectNames(payload2).subscribe(res=>{

  //   },err=>{

  //   })
  // }

}
