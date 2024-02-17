import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-project-un-billing',
  templateUrl: './project-un-billing.component.html',
  styleUrls: ['./project-un-billing.component.css']
})
export class ProjectUnBillingComponent implements OnInit {
  @Input() pendingTimeSheet = {
    "monthYear": "",
    "pendingDates": []
  }
  @Input() chartData;
  @Input() isLoadingForDates = false;
  @Output() pendingDateCB = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  pendingDate(d) {
    this.pendingDateCB.emit({monthYear:this.pendingTimeSheet.monthYear, d})
  }

}
