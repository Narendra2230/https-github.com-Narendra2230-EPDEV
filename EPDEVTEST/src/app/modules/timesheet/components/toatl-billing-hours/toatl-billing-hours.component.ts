import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-toatl-billing-hours',
  templateUrl: './toatl-billing-hours.component.html',
  styleUrls: ['./toatl-billing-hours.component.css']
})
export class ToatlBillingHoursComponent implements OnInit, OnChanges {
  @Input() datesObject;
  @Input() TotalBillingsSummary: any = {
      "userName": "",
      "empId": '',
      "startDate": "",
      "endDate": "",
      "totalBillableHours": 0.0,
      "totalIPPOCHours": 0.0,
      "totalSupportHours": 0.0,
      "totalNonBillableHours": 0.0,
      "totalApprovedHours": 0.0,
      "totalSubmittedHours": 0.0,
      "totalRejectedHours": 0.0,
      "status": 0,
      "message": null
  }   
  constructor(private _service: TimesheetService, private dataService: DataService,  private _session: SessionServiceService) {
  }
  ngOnChanges(changes): void {
    // if(this.datesObject['startDate'] && this.datesObject['endDate']){
      
    // }
  }
 

  ngOnInit() {
  
  }

}
