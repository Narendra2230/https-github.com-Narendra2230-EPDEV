import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DatePipe } from '@angular/common';
import { TimesheetService } from 'src/app/services/time-sheet/timesheet.service';
import {CalendarModule} from 'primeng/calendar';


@Component({
  selector: 'app-global-date',
  templateUrl: './global-date.component.html',
  styleUrls: ['./global-date.component.css']
})
export class GlobalDateComponent implements OnInit, OnChanges {

  @Output() onGlobalDateChange = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Input() showarefresh =true;
  @Input() globalDateRange = [];
  public globalDatas  = {};
  public fromDate = "";
  public toDate = "";
  public scheduleOption = {};
  public rangeDates = [];
  public maxDate;
  public minDate;



  constructor(private formatdate:DatePipe,private _service: TimesheetService) { }
  ngOnChanges(changes: SimpleChanges): void {     
    this.globalDateRange = this.globalDateRange.map(d=>new Date(d));
  }

  ngOnInit() {
    let today = new Date();
let month = today.getMonth();
this.maxDate = new Date();
this.maxDate.setMonth(month);
this.minDate = new Date('01/01/2018')
    // this.getGlobalDats();
  }

  // getGlobalDats(){
  //   this._service.GetglobalDate("").subscribe(data=>{
  //     this.globalDatas= data;
  //     this.fromDate = this.formatdate.transform(this.globalDatas['startDate'],'dd-MM-yyyy');
  //     this.toDate = this.formatdate.transform(this.globalDatas['endDate'],'dd-MM-yyyy');
  //     let today = new Date();
  //     let firstDate = new Date();
  //     console.log("today", today);
  //     console.log("firstDate", firstDate);

  //     firstDate.setDate(today.getDate() - 7);
  //     this.rangeDates = [ firstDate, today];
  //     //alert( this.rangeDates);
  //   })
  // }
  setDateRange(){
   
  }

  onSelect(){

  }
  onClose(){
    this.onGlobalDateChange.emit(this.globalDateRange)
  }
  resetDates(){
    this.reset.emit();
  }

 

}
