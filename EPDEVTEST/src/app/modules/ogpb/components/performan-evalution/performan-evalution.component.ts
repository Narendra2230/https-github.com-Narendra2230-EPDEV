import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HomeService } from './../../../../services/omgb/home.service'
import { SessionServiceService } from './../../../../services/session/session-service.service';
import { Router } from '@angular/router';
import { AlertMessageService } from 'src/app/services/alert-message.service';

@Component({
  selector: 'app-performan-evalution',
  templateUrl: './performan-evalution.component.html',
  styleUrls: ['./performan-evalution.component.css']
})
export class PerformanEvalutionComponent implements OnInit, OnDestroy {
  private KPIData: any = {};
  private isLoading = true;
  private isNoKPIS = false;
  @Input() associateID = "";
  @Input() needAPICall = false;
  @Input() needKeyInfo = true;
  @Input() isPersonal = true;
  private isManages = false;
  private isAsso = false;
  private isCurrentQuarter = false;
  private showSendNowCTA = true;
  private isSystemKPIs = true;
  private subscription;
  private pMSKpiList: any = [];
  private ratingBtn: any = {};
  constructor(private _homeServices: HomeService,
    private _session: SessionServiceService, private router: Router, private _alert: AlertMessageService) {
    this.isManages = this._session.isUserManager();
    this.isAsso = this._session.isUserAssociate();
  }

  checkIsQurterDetails() {
    let qd = this._session.getCurrentQuarterDetails();
    if (qd !== null) {
      return this.isCurrentQuarter = qd['isCurrentQuarter'];
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  check() {
    let AssociateId = this._session.getUserID();
    let qDetails = this._session.getCurrentQuarterDetails() || {};
    if (this.needAPICall) {
      AssociateId = this.associateID;
    }
    this._homeServices.GetKPIRequest({
      QuarterId: qDetails['id'],
      AssociateId: AssociateId
    }).subscribe((res: any) => {
      if (res == false) {
        this.showSendNowCTA = true;
      }else{
        this.showSendNowCTA = false;
      }
    })
  }
  ngOnInit() {
    // let { clicked = false, time = null } = this._session.getClickTime() || {};
    // clicked ? this.showSendNowCTA = false : this.showSendNowCTA = true;
    this.check();
    this.subscription = this._homeServices.getUIShouldUpadateEvent().subscribe(data => {
      if (data['type'] === 'QUARTR_DETAILS_UPDATED' && data['page'] !== 'MYTEAM') {

        this.checkIsQurterDetails();
        this.getKPIDetails({ "QuarterId": data['data']['id'], "AssociateId": this._session.getUserID() });
      } else if (data['type'] === 'QUARTR_DETAILS_INTIATED' && data['page'] !== 'MYTEAM') {
        this.checkIsQurterDetails();
        this.getKPIDetails({ "QuarterId": data['data']['id'], "AssociateId": this._session.getUserID() });
      } else if (data['type'] === "GETQD") {
        this.checkIsQurterDetails();
      } else if (data['type'] === "CLEAR_DATA") {
        this.checkIsQurterDetails();
        let AssociateId = this._session.getUserID();
        if (this.needAPICall) {
          AssociateId = this.associateID;
        }
        this.getKPIDetails({ "QuarterId": data['data']['id'], "AssociateId": AssociateId });
      }
    })
    if (this.needAPICall) {
      let qDetails = this._session.getCurrentQuarterDetails();
      this.getKPIDetails({ "QuarterId": qDetails['id'], "AssociateId": this.associateID });
    }
  }
  assignGoalsP() {
    this._session.storeSelectedEmpDetails([this._session.getSelectedEmpDetails()])
    this.router.navigateByUrl('/assign-goals-band');
  }
  sendKPIRequest() {
    // let { clicked = false, time = null } = this._session.getClickTime() || {};
    // if (clicked) {
    //   this._alert.succuss("Already mail shared to ypur Manager");
    //   return;
    // }

    this.isLoading = true;
    let AssociateId = this._session.getUserID();
    if (this.needAPICall) {
      AssociateId = this.associateID;
    }
    let payLoad = {
      "AssociateID": AssociateId,
      "QuarterId": this._session.getCurrentQuarterDetails().id
    }

    this._homeServices.SaveKpiRequestToManager(payLoad).subscribe(res => {
      this.isLoading = false;
      let data: any = res;
      if (data === true) {
        this._alert.succuss("successfully sent an email");
       // this._session.setClickTIme();
        this.showSendNowCTA = false;
      }
      else {
        this._alert.error("Something went wrong. Please send a mail to @EP Support");
      }
    })

  }

  getKPIDetails(payload) {
    this.isLoading = true;
    this._homeServices.getPMSSelfEvaluationList(payload).subscribe(r => {
      if ((r['pMSKpiLists'] || []).length === 0) {
        this.isNoKPIS = true;
        this.isLoading = false;
        return;
      }
      this.pMSKpiList = r;
      this.KPIData = r;
      this.ratingBtn = r && r['pMSFInalRating'];
      this._session.storeFinalRating({'final-rating': this.ratingBtn});
      let sysKPILen = ((this.KPIData['pMSKpiLists'] || []).filter(l => l['isFixed'] === true) || []).length;
      sysKPILen === 0 ? this.isSystemKPIs = false : this.isSystemKPIs = true;
      this.isLoading = false;
      this.isNoKPIS = false;
    });
  }

}
