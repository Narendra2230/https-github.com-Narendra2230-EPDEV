import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asso-on-bilable-projects',
  templateUrl: './asso-on-bilable-projects.component.html',
  styleUrls: ['./asso-on-bilable-projects.component.css']
})
export class AssoOnBilableProjectsComponent implements OnInit {
  @Input() mangerDashboardData =[];
  constructor() { }

  ngOnInit() {
  }



}
