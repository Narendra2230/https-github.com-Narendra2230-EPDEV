import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-hierarchy-header',
  templateUrl: './org-hierarchy-header.component.html',
  styleUrls: ['./org-hierarchy-header.component.css']
})
export class OrgHierarchyHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.setItem('selectedEmpId', '');
  }

}
