import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
@Input() managerData = {};
  constructor() { }

  ngOnInit() {
  }

}
