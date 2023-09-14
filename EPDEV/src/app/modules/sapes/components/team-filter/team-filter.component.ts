import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from 'src/app/services/omgb/home.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-team-filter',
  templateUrl: './team-filter.component.html',
  styleUrls: ['./team-filter.component.css']
})
export class TeamFilterComponent implements OnInit, OnDestroy {
  private metaInfo = {}
  private isLoading = false;
  private latestSeletedFilters={
    bu:'null',
    subbu:'null',
    track:'null'
  };
  private subscription;
  constructor(private homeService: HomeService, private _session: SessionServiceService) {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this.homeService.getUIShouldUpadateEvent().subscribe(result => {
      let { type = null, data = {} } = result || {};
      if (type === "PMS_LOADED") {
        //console.log(data.pmsStatusId);
        this.homeService.GetMasterLookupData({ QuarterId: null, pmsStatusId: data['pmsStatusId'] }).subscribe(s => {
          this.metaInfo = s;
        })
      }

    })
  }
  businessUnitsChange(e) {
    let v = e.target.value;
    let bu = this.metaInfo['businessUnits'];
    let sub = bu.find(e => e.id == v) || {};
    this.metaInfo['subBusinesssUnits'] = sub['subBusinesssUnits'] || [];
    this.metaInfo['tracks'] = [];
    this.metaInfo = this.metaInfo;
  }
  trackChange(e) {
    let v = e.target.value;
    let bid=this.latestSeletedFilters.bu;
    let bu = this.metaInfo['businessUnits'];
    let tracks = ((bu.find(e => e.id == bid) || {})['subBusinesssUnits'] || []).find(e => e.id == v) || {};
    this.metaInfo['tracks'] = tracks['tracks'] || [];
    this.metaInfo = this.metaInfo;
  }

  searchData(getData) {
    this.isLoading = true;
    let cq = this._session.getCurrentQuarterDetails();
    let PmsStatus = this._session.getEvalutionData();

    let payload = {
      "QuarterId": cq.id,
      "PmsStatusId": PmsStatus.pmsStatusId,
      "BandId": getData.bands,
      "SubBuId": getData.subBusinesssUnits,
      "BuId": getData.businessUnits,
      "TrackId": getData.tracks,
      "DesignationId": getData.designations,
      "GroupId": getData.groups
    }

    this.homeService.GetMyTeamDetails(payload).subscribe(data => {
      let q = Object.keys(getData).filter(e => getData[e] !== "").map(e => `${e}=${getData[e]}`).join("&");
      this.homeService.UIShouldUpadate({ type: 'FILTER_APPLIED', data: { qs: q, fData: data } });
      this.isLoading = false;

    })

  }

  resetFiltr() {
    this.isLoading = true;
    let cq = this._session.getCurrentQuarterDetails();
    let PmsStatus = this._session.getEvalutionData();
    let payload = {
      "QuarterId": cq.id,
      "PmsStatusId": PmsStatus.pmsStatusId,
      "BandId": "",
      "SubBuId": "",
      "BuId": "",
      "TrackId": "",
      "DesignationId": "",
      "GroupId": ""
    }


    this.homeService.GetMyTeamDetails(payload).subscribe(data => {
      this.homeService.UIShouldUpadate({ type: 'RESET_FILTER', data: { nullfData: data } });
      this.isLoading = false;
    })
  }

}
