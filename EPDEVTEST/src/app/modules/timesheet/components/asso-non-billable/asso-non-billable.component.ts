import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asso-non-billable',
  templateUrl: './asso-non-billable.component.html',
  styleUrls: ['./asso-non-billable.component.css']
})
export class AssoNonBillableComponent implements OnInit {
@Input() chartData = []
@Input() timesheetManagerAssociatePendingData=[];
  constructor() { }

  ngOnInit() {
  }

}
