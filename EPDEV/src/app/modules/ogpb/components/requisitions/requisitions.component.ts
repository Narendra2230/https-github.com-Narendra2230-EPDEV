import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { DataService } from './../../../../services/data.service';
import { HomeService } from './../../../../services/omgb/home.service';
import { SessionServiceService } from './../../../../services/session/session-service.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';


@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.css']
})
export class RequisitionsComponent implements OnInit, OnChanges, OnDestroy {
  private currentFormData = {};
  private KPIData: any = {};
  private pMSRequisitionComments = [];
  private pMS_RequisitionKpiDetails: any = [];
  private isUserManager = false;
  private isUserAssociate = false;
  private isCurrentQuarter = false;
  private isLoade = true;
  @Input() associateID: any = "";
  @Input() needAPICall = false;
  @Input() isPersonal = true;
  private isFormValid = false;
  private resetbtn = false;
  private isAPILoad = false;
  private subscription;
  constructor(private _dataService: DataService,
    private _homeServices: HomeService,
    private _session: SessionServiceService,
    private _alert: AlertMessageService) {
    this.isUserAssociate = this._session.isUserAssociate();
    this.isUserManager = this._session.isUserManager();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.checkIsQurterDetails();
    this.currentFormData = this._dataService.getPerformanceEvaluation();
    this._dataService.getFormChangeEmitter().subscribe(d => {
      this.currentFormData = this._dataService.getPerformanceEvaluation();
    })
    this.subscription = this._homeServices.getUIShouldUpadateEvent().subscribe(data => {

      if (data['type'] === 'QUARTR_DETAILS_UPDATED' && data['page'] !== 'MYTEAM') {
        this.getKPIDetails({ "QuarterId": data['data']['id'], "AssociateId": this._session.getUserID() });
      } else if (data['type'] === 'QUARTR_DETAILS_INTIATED' && data['page'] !== 'MYTEAM') {
        this.getKPIDetails({ "QuarterId": data['data']['id'], "AssociateId": this._session.getUserID() });
      } else if (data['type'] === 'sendKpidata') {
        this.sendComments();
      }
    })
    if (this.needAPICall) {
      let qDetails = this._session.getCurrentQuarterDetails();
      this.getKPIDetails({ "QuarterId": qDetails['id'], "AssociateId": this.associateID });
    } else {
      this.associateID = this._session.getUserID()
    }

  }
  getKPIDetails(payload) {
    this.isLoade = true;
    this._homeServices.getPMSRequisitionList(payload).subscribe(r => {
      this.checkIsQurterDetails();
      this.KPIData = r;
      this.KPIData.forEach(e => {
        if (e['pMSRequisitionComments'] === undefined || e['pMSRequisitionComments'] === null) {
          e['pMSRequisitionComments'] = {
            "requisitionDetailsId": null,
            "associateComment": null,
            "managerComment": null
          }
        }

      })
      this.KPIData.forEach(e => {
        e.ass_cmt = (((e['pMSRequisitionComments'] || [])[0] || {})['associateComment'] || "");
        e.requisitionDetailsId = (((e['pMSRequisitionComments'] || [])[0] || {})['requisitionDetailsId'] || "");
        e.mngr_cmt = (((e['pMSRequisitionComments'] || [])[0] || {})['managerComment'] || "");
        e.ass_cmt_disable = (e.ass_cmt !== "" && e.ass_cmt !== null) ? true : false;
        e.mngr_cmt_disable = (e.mngr_cmt !== "" && e.mngr_cmt !== null) ? true : false;
      });
      this.pMS_RequisitionKpiDetails = r;
      let pEdata = this._dataService.getPerformanceEvaluation();
      pEdata['pMS_RequisitionKpiDetails'] = this.pMS_RequisitionKpiDetails;
      this._dataService.setPerformanceEvaluation(pEdata);
      this.isLoade = false;
      this._homeServices.UIShouldUpadate({ type: 'KPI_REQUITION_COMES', data: {} });    
    });
  }
  checkIsQurterDetails() {
    let qd = this._session.getCurrentQuarterDetails();
    if (qd !== null) {
      this.isCurrentQuarter = qd['isCurrentQuarter'];
    }
  }
  checkValidation() {
    let obj = this._dataService.getPerformanceEvaluation();
    let isValid = true;
    let vdata = obj['pMS_RequisitionKpiDetails'] || [];
    vdata.forEach(e => {
      if (e.ass_cmt === "" || e.ass_cmt === undefined || e.ass_cmt === null) {
        isValid = false;
      }
    });
    this.isFormValid = isValid;
  }

  sendComments() {
    this.isAPILoad = true;
    let obj = this._dataService.getPerformanceEvaluation();
    let isValid = true;
    let vdata = obj['pMS_RequisitionKpiDetails'] || [];
    vdata.forEach(e => {
      if (e.ass_cmt === "" || e.ass_cmt === undefined || e.ass_cmt === null) {
        isValid = false;
      }
    });
    if (vdata.length === 0) isValid = false;
    let userID = this.needAPICall ? this.associateID : this._session.getUserID();
    let isUserAssociate = this.needAPICall ? false : this.isUserAssociate;

    let getQc = this._session.getCurrentQuarterDetails();
    let payload = {
      "AssociateId": userID,
      "IsAsscoaite": false,
      "QuarterId": getQc['id'],
      "pMSRequisitionComments": []
    }
//console.log(obj['pMS_RequisitionKpiDetails'])
    payload.pMSRequisitionComments = obj['pMS_RequisitionKpiDetails'].map((d: any) => ({
      "RequisitionId": d.requisitionId,
      "RequisitionDetailsId": d.requisitionDetailsId,
      "AssociateComment": d.ass_cmt,
      "ManagerComment": d.mngr_cmt || ""
    })
    );

    this._homeServices.SaveRequisitionComments(payload).subscribe(data => {
      this.isAPILoad = false;
      this._alert.succuss("PMS Comments saved successfully");
      this.resetAllFields();
    })

  }

  ngOnChanges() {
  }


  handleInputChange(event: any, parentKey: string, index) {
    if (parentKey === 'ASSOCIATE') {
      this.pMS_RequisitionKpiDetails[index].ass_cmt = event.target.value;
    }
    if (parentKey === 'MANAGER') {
      this.pMS_RequisitionKpiDetails[index].mngr_cmt = event.target.value;
    }
    this.pMS_RequisitionKpiDetails = this.pMS_RequisitionKpiDetails;
    let pEdata = this._dataService.getPerformanceEvaluation();
    pEdata['pMS_RequisitionKpiDetails'] = this.pMS_RequisitionKpiDetails;
    this._dataService.setPerformanceEvaluation(pEdata);
    this.checkValidation();
  }
  resetAllFields() {

    let qDetails = this._session.getCurrentQuarterDetails();
    this._homeServices.UIShouldUpadate({ type: 'CLEAR_DATA', data: qDetails });
    this.getKPIDetails({ "QuarterId": qDetails['id'], "AssociateId": this.associateID });
  }



}
