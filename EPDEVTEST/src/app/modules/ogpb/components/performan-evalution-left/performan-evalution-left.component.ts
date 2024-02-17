import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from './../../../../services/data.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
@Component({
  selector: 'app-performan-evalution-left',
  templateUrl: './performan-evalution-left.component.html',
  styleUrls: ['./performan-evalution-left.component.css']
})
export class PerformanEvalutionLeftComponent implements OnInit, OnChanges {
  private currentFormData = {};
  @Input() KPIData;
  private pMSKpiLists = [];
  private pMSFInalRating = {};
  private isCurrentQuarter = false;
  constructor(private _dataService: DataService, private _session: SessionServiceService) { }

  ngOnInit() {
    let qd = this._session.getCurrentQuarterDetails();
    if (qd !== null) {
      this.isCurrentQuarter = qd['isCurrentQuarter'];
    }
    this.currentFormData = this._dataService.getPerformanceEvaluation();
    this._dataService.getFormChangeEmitter().subscribe(d => {
      this.currentFormData = this._dataService.getPerformanceEvaluation();
    })
  }
  ngOnChanges() {
    this.pMSKpiLists = (this.KPIData['pMSKpiLists'] || []).filter(l => l['isFixed'] === true);
    this.pMSFInalRating = this.KPIData['pMSFInalRating'] || {};
  }

   getContainerWidths() {
    if (this.pMSKpiLists.length === 1) {
      return { 'width': "50%" };
    } else if (this.pMSKpiLists.length === 2) {
      return { 'width': "49%" };
    } else if (this.pMSKpiLists.length === 3) {
      return { 'width': "32.333%" };
    } else if (this.pMSKpiLists.length === 4) {
      return { 'width': "24.00%" };
    } else if (this.pMSKpiLists.length === 5) {
      return { 'width': "20.00%" };
    } else if (this.pMSKpiLists.length === 6) {
      return { 'width': "15.00%" };
    } else {
      return {};
    }
  }
  onKey(event: any, childKey, index) { // without type info
    this.pMSKpiLists[index][childKey] = event.target.value;
    this.pMSKpiLists = this.pMSKpiLists;
    let pEdata = this._dataService.getPerformanceEvaluation();
    pEdata['pMSKpiLists_fixed'] = this.pMSKpiLists;
    this._dataService.setPerformanceEvaluation(pEdata);
  }

}
