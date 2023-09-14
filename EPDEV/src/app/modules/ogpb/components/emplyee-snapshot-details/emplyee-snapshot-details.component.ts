import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './../../../../services/omgb/home.service';
import { SessionServiceService } from './../../../../services/session/session-service.service';
@Component({
  selector: 'app-emplyee-snapshot-details',
  templateUrl: './emplyee-snapshot-details.component.html',
  styleUrls: ['./emplyee-snapshot-details.component.css']
})
export class EmplyeeSnapshotDetailsComponent implements OnInit, OnDestroy {
  private projectsItems = [];
  private EvaluationDetails = {};
  private empSnapShotDtl: Object = {};
  private isLoading1 = false;
  private isLoading2 = false;
  private subscription;
  constructor(private _homeSerice: HomeService, private _session: SessionServiceService) { }


  ngOnInit() {
    this.subscription = this._homeSerice.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'QUARTR_DETAILS_UPDATED') {
        this.doAPICalls({
          "QuarterId": data['data']['id'],
          "AssociateId": this._session.getUserID(),
          "Quarter": data['data']['displayName'], "Year": data['data']['year']
        }, false);
      } else if (data['type'] === 'QUARTR_DETAILS_INTIATED') {
        this.doAPICalls({
          "QuarterId": data['data']['id'],
          "AssociateId": this._session.getUserID(),
          "Quarter": data['data']['displayName'], "Year": data['data']['year']
        }, true);
      } else if (data['type'] === "CLEAR_DATA") {
        let data = this._session.getCurrentQuarterDetails();
        this.doAPICalls({
          "QuarterId": data['id'],
          "AssociateId": this._session.getUserID(),
          "Quarter": data['displayName'],
          "Year": data['year']
        }, false);
      } else if (data['type'] === "RAISED_DISCUSSION") {
        let data = this._session.getCurrentQuarterDetails();
        this.doAPICalls({
          "QuarterId": data['id'],
          "AssociateId": this._session.getUserID(),
          "Quarter": data['displayName'],
          "Year": data['year']
        }, false);
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  doAPICalls(paylod, isfirst) {
    this.isLoading1 = true;
    this.isLoading2 = true;
    let paylod1 = paylod;
    let paylod2 = paylod;
    if (isfirst) {
      paylod2['Year'] = null;
      paylod2['Quarter'] = "";
    }
    this._homeSerice.getEvaluationDetails(paylod2).subscribe(data => {
      this.EvaluationDetails = data;
      this.isLoading1 = false;
    });
    this._homeSerice.quarterDetails(paylod).subscribe(data => {
      this.projectsItems = data['projectsItems'];
      this.isLoading2 = false;
    });
  }
  quarterChanged(data) {
  }
  initQuater() {

  }
}
