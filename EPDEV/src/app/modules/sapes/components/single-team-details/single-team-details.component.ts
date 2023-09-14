import { Component, OnInit, OnDestroy } from '@angular/core';

import { HomeService } from './../../../../services/omgb/home.service';
import { SessionServiceService } from './../../../../services/session/session-service.service';
import { Router } from '@angular/router';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { EncryptionService } from 'src/app/services/encryption.service';
@Component({
  selector: 'app-single-team-details',
  templateUrl: './single-team-details.component.html',
  styleUrls: ['./single-team-details.component.css']
})
export class SingleTeamDetailsComponent implements OnInit, OnDestroy {
  private projectsItems = [];
  private EmpList: any = [];
  private empSnapShotDtl: Object = {};
  private isLoading = false;
  private showPlzWait = true;
  private LatestpmsStatusId=null;
  private subscription;
  constructor(private _homeSerice: HomeService,
    private _session: SessionServiceService,
    private router: Router,
    private alertServices: AlertMessageService,
    private encryptionService: EncryptionService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this._homeSerice.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'QUARTR_DETAILS_UPDATED') {
        // this.doAPICalls({
        //   "QuarterId": data['data']['id'],
        //   "AssociateId": this._session.getUserID(),
        //   "Quarter": data['data']['displayName'], "Year": data['data']['year']
        // }, false);
      } else if (data['type'] === 'QUARTR_DETAILS_INTIATED') {
        // this.doAPICalls({
        //   "QuarterId": data['data']['id'],
        //   "AssociateId": this._session.getUserID(),
        //   "Quarter": data['data']['displayName'], "Year": data['data']['year']
        // }, true);
      } else if (data['type'] === 'FILTER_APPLIED') {
        this.EmpList = data['data']['fData'];
      } else if (data['type'] === 'RESET_FILTER') {
        this.EmpList = data['data']['nullfData'];
      }

      else if (data['type'] === 'PMS_CHANGED') {
        let qd = this._session.getCurrentQuarterDetails();
        this.LatestpmsStatusId=data['data']['pmd']['pmsStatusId'];
        this.doAPICalls({
          "QuarterId": qd['id'],
          "AssociateId": this._session.getUserID(),
          "PmsStatusId": data['data']['pmd']['pmsStatusId'],
          "Year": qd['year']
        }, true);
      } else if (data['type'] === 'ASSIGN_GOALS') {
        this._session.storeSelectedEmpDetails(this.EmpList.filter(e => e.isEmpChecked));
        this.router.navigateByUrl(`/assign-goals-band-sapes`);
      }
      if (data['type'] === "PMS_LOADED") {
        let qd = this._session.getCurrentQuarterDetails();
        let { pmsStatusId = null } = this._session.getEvalutionData() || {};
        this.LatestpmsStatusId=pmsStatusId;
        this.doAPICalls({
          "QuarterId": qd['id'],
          "AssociateId": this._session.getUserID(),
          "PmsStatusId": pmsStatusId,
          "Year": qd['year']
        }, true);
      }

    })
  }
  checkValidity() {
    let emp = this.EmpList.find(e => e.isEmpChecked) || {};
    return emp;
  }
  emit() {
    let title= 'null';
    let es = this.EmpList.filter(e => e.isEmpChecked === true) || [];
    let enableCTA = es.length == 0 ? false : true;
    if(this.LatestpmsStatusId===1){    
      title= "Edit ASSIGN MEASURES";
    }else { title="ASSIGN MEASURES";}
    this._homeSerice.UIShouldUpadate({ type: "EMP_CHECK", data: { enableCTA,title } })

  }
  checkEmp(data, i, e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (this.EmpList[i]['isEmpChecked']) {
      this.EmpList[i]['isEmpChecked'] = !this.EmpList[i]['isEmpChecked'];
      this.EmpList = this.EmpList;
      this.emit();
      return;
    }
    let oldSelect_band = (this.checkValidity() || {}).bandId || "";
    let oldSelect_bu = (this.checkValidity() || {}).bu || "";
    let { bandId = null, bu = null } = this.EmpList[i] || {};
    if ((oldSelect_band === '' || oldSelect_band === bandId) &&
      (oldSelect_bu === '' || oldSelect_bu === bu)) {
      this.EmpList[i]['isEmpChecked'] = true;
      this.EmpList.forEach((e, ind) => {
        if (e.bandId === bandId && e.bu === bu && !e.isGoalAssigned) {
          this.EmpList[ind]['isEmpChecked'] = true;
        }
      })
      this.EmpList = this.EmpList;
      this.emit();
    } else {
      this.alertServices.error("You cannot select different Band & Group")
    }

  }
  doFilterAPICall(data) {
    this._homeSerice.GetSearchFilters({}, data.qs).subscribe(data => {

    });
  }
  doAPICalls(paylod, isfirst) {
    this.isLoading = true;
    let paylod2 = paylod;
    if (isfirst) {
      paylod2['Year'] = null;
      paylod2['Quarter'] = "";
    }
    this._homeSerice.GetMyTeamDetails(paylod2).subscribe(data => {
      this.EmpList = data;
      this.isLoading = false;
      this.showPlzWait=false;
    });

  }
  navigate(data, id) {
    this._session.storeSelectedEmpDetails(data);
    this.router.navigateByUrl(`/ogpb-evaluation-sapes/${this.encryptionService.enCryptEmpID(id)}`);
  }
}
