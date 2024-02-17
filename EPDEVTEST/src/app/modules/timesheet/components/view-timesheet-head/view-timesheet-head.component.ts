import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-view-timesheet-head',
  templateUrl: './view-timesheet-head.component.html',
  styleUrls: ['./view-timesheet-head.component.css']
})
export class ViewTimesheetHeadComponent implements OnInit, OnChanges {

  @Input() datesObject = {};
  @Output() onDateViewChanges = new EventEmitter();
  @Output() cloneTimeSheet = new EventEmitter();
  @Output() resetSheet = new EventEmitter();
  @Input() isLoading = false;
  @Input() from = "ASSOC";
  @Input() showClone = false;

  public showingDateObject = { start: {}, end: {} };
  public viewType = "DAY";
  isNotFTA: boolean = false;

  constructor(private _service: TimesheetService, private dataService: DataService,
    private _session: SessionServiceService) { }
  ngOnChanges(changes: SimpleChanges): void {
    const data = this._session.getSessionDetails();
    if(data['employmentType'] !== 'FTA'){
      this.isNotFTA = true;
    }
    if (this.datesObject['startDate']) {
      const month = this.dataService.dateFormatter(this.datesObject['startDate'], "EEEE, MMMM d, y");
      this.showingDateObject = {
        start: {
          date: this.dataService.dateFormatter(this.datesObject['startDate'], "d"),
          day: this.dataService.dateFormatter(this.datesObject['startDate'], "EEEE"),
          month: this.dataService.dateFormatter(this.datesObject['startDate'], "MMMM")
         // month: this.dataService.dateFormatter(this.datesObject['startDate'], "MMMM, y")
        },
        end: {
          date: this.dataService.dateFormatter(this.datesObject['endDate'], "d"),
          day: this.dataService.dateFormatter(this.datesObject['endDate'], "EEEE"),
          month: this.dataService.dateFormatter(this.datesObject['endDate'], "MMMM")
          //month: this.dataService.dateFormatter(this.datesObject['endDate'], "MMMM, y")
        }
      }
      if (this.from !== 'MNGR') {
        const dateObj = this.datesObject['dateObj'];
        if (dateObj['EntryMode']) {
          this.viewType = dateObj['EntryMode'];
        }
      }
    }
  }
  onViewTypeChange(type) {
    this.viewType = type;
    this.onDateViewChanges.emit({ type, dateType: "CURR", isNull:true })
  }
  prev(type) {
    this.onDateViewChanges.emit({ type, dateType: "PREV" })
  }
  next(type) {
    this.onDateViewChanges.emit({ type, dateType: "NEXT" })
  }

  ngOnInit() {
    // this.getEmpTimeSheetDetails();
  }
  getEmpTimeSheetDetails() {

    const payload = {
      BillingCycle: "",
      startDate: "2020-03-22T22:44:46.2137159+05:30",
      // EndDate: "2019-12-24",
      EntryMode: "Day",
      Datetype: "Next"
    }
    // this._service.GetDates(payload).subscribe(res => {

    // }, err => {

    // })
  }

  clone(type){
    this.cloneTimeSheet.emit(type);
  }
  reset(){
    alert();
    this.resetSheet.emit();
  }

}
