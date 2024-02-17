import { Component, OnInit, Input } from '@angular/core';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';

@Component({
  selector: 'app-mng-details-timesheet',
  templateUrl: './mng-details-timesheet.component.html',
  styleUrls: ['./mng-details-timesheet.component.css']
})
export class MngDetailsTimesheetComponent implements OnInit {
  public empSheets = [];
  @Input() timesheetAssociateData = [];
  @Input() isHideEle = false;
  constructor(private _service: TimesheetService) { }

  ngOnInit() {
  }
  check(i, e) {
    var status = e.target.checked;
    const { timesheetAssociateData } = this;
    if (i === 'all') {
      if (status)
        timesheetAssociateData.forEach(m => { if (m['tStatus'] !== 'Approved') m.checked = true });
      else
        timesheetAssociateData.forEach(m => { if (m['tStatus'] !== 'Approved') m.checked = false });
    } else {
      timesheetAssociateData[i]['checked'] = status;
    }
    this.timesheetAssociateData = timesheetAssociateData;
  }
  getSelectedData() {
    return this.timesheetAssociateData;
  }

}
