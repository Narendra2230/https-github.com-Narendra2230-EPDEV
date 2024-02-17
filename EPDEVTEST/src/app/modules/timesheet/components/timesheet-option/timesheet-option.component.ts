import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timesheet-option',
  templateUrl: './timesheet-option.component.html',
  styleUrls: ['./timesheet-option.component.css']
})
export class TimesheetOptionComponent implements OnInit {

  @Output() donwloadSheet = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  download(){
     this.donwloadSheet.emit({})
  }

}
