import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-team-filter',
  templateUrl: './team-filter.component.html',
  styleUrls: ['./team-filter.component.css']
})
export class TeamFilterComponent implements OnInit, OnChanges {

  @Input() filterMetaData = [];
  @Output() onSearch = new EventEmitter();
  @Output() reset = new EventEmitter();
  public filters = [];
  public filterModel = {
    "Action":"","TimeheetAction":"", "AllocationStatus":"", "BusinessUnit":"", "ReportingManager":"", "Associates":"",
     "Month":"", "Year":""
  }
  constructor(private messageService: MessageService) { }
  resetFun(){
    this.filterModel= {
      "Action":"","TimeheetAction":"", "AllocationStatus":"", "BusinessUnit":"", "ReportingManager":"", "Associates":"",
       "Month":"", "Year":""
    }
    this.reset.emit();

  }
  search(){
    let isError = false;
    let errorMsg = '';
    if(this.filterModel.Action==='' || this.filterModel.Action===null){
      isError = true;
      errorMsg = errorMsg + 'Action, ';
    }
    if(this.filterModel.Year==='' || this.filterModel.Year===null){
      isError = true;
      errorMsg = errorMsg + 'Year, ';
    }
    if(this.filterModel.Month==='' || this.filterModel.Month===null){
      isError = true;
      errorMsg = errorMsg + 'Month, ';
    }
    if(isError){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: errorMsg+ ' parameters are mandatory' });
      return;
    }
    this.onSearch.emit(this.filterModel);
  }
  ngOnChanges(changes: SimpleChanges): void {
   
    this.filters = this.filterMetaData.map(t=>t.action_Name).filter((value, index, self) => self.indexOf(value) === index);
    
  }
  getValue(type){
     return this.filterMetaData.filter(t=>t.action_Name===type);
  }
  ngOnInit() {
  }
  getStr(s){
    return s.replace(/\s/g,'');
  }
  resetFilter(){
    this.filterModel= {
      "Action":"","TimeheetAction":"", "AllocationStatus":"", "BusinessUnit":"", "ReportingManager":"", "Associates":"",
       "Month":"", "Year":""
    }
  }
}
