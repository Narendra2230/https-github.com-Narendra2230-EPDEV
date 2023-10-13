import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DataService } from './../../../../services/data.service';
import { HomeService } from './../../../../services/omgb/home.service';
import { SessionServiceService } from './../../../../services/session/session-service.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { constants } from 'zlib';


@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.css']
})
export class RequisitionsComponent implements OnInit, OnChanges, OnDestroy {
  private currentFormData = {};
  private KPIData: any = {};
  private pMSRequisitionComments = [];
  private pMSRequisitionRatingDetails: any = [];
  private discussedDate: any = '';
  private pMS_RequisitionKpiDetails: any = [];
  private pMS_EmpSelf_RequisitionKpiDetails: any = [];
  private pMS_Mgr_RequisitionKpiDetails: any = [];
  private isUserManager = false;
  private pMS_Usr_Rating: any = [];
  private managerId = '';
  private isUserAssociate = false;
  private isRateYourAssociate: any;
  private isCurrentQuarter = false;
  private minDate =  (new Date()).toISOString().split('T')[0];
  private isLoade = true;
  private isPromotionRecommendation = '';
  private managerDetails: any = {};
  private ratingJustification = '';
  private isHRPromoted = '';
  private hrRating: any;
  @Input() associateID: any = "";
  @Input() needAPICall = false;
  @Input() isPersonal = true;
  private isFormValid = false;
  private resetbtn = false;
  private isAPILoad = false;
  private subscription;
  private form: FormGroup;
  private rateYourAssociate: any;
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
    this.getRatingDetails(null);
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
    //  console.log(qDetails)
      this.getKPIDetails({ "QuarterId": qDetails['id'], "AssociateId": this.associateID });
    } else {
      this.associateID = this._session.getUserID()
      //console.log()
    }

    this.form = new FormGroup({
      rateYourAssociate: new FormControl('', Validators.required)
    });
    if(this.isUserManager && !this.isPersonal) {
      let getQc = this._session.getCurrentQuarterDetails();
      let userID = this.needAPICall ? this.associateID : this._session.getUserID();
      let payload = {
        "AsscoaiteId": userID,
        "QuarterId": getQc['id'].toString()
      }
      this._homeServices.GetPMSManagerScaleRating(payload).subscribe(data => {
        console.log(data)
        this.isPromotionRecommendation = data['isPromoted'];
        this.discussedDate = data['discussedDate'] ? new Date(new Date(data['discussedDate']).setDate(new Date(data['discussedDate']).getDate() + 1)).toISOString().split('T')[0] : null;
        this.isRateYourAssociate = Number(data['ratingId']);
        this.pMS_Usr_Rating
      .map((e, i) => {
        e.ratingId==this.isRateYourAssociate ? this.pMS_Usr_Rating[i].checked = true : this.pMS_Usr_Rating[i].checked = false
      })
        this.ratingJustification = data['justification'];
        this.isHRPromoted = data['isHRPromoted'] == true ? 'Yes' : 'No';
        this.getOverallRating(data['hrRating']);
      })
    } else if (this.isPersonal) {
      let getQc = this._session.getCurrentQuarterDetails();
      let userID = this.needAPICall ? this.associateID : this._session.getUserID();
      let payload = {
        "AsscoaiteId": userID,
       // "QuarterId": getQc['id'].toString()
       "QuarterId": 23
      }
      this._homeServices.GetPMSManagerScaleRating(payload).subscribe(data => {
        this.isHRPromoted = data['isHRPromoted'] == true ? 'Yes' : 'No';
        this.getOverallRating(data['hrRating']);
      })
    }
    console.log(this.minDate)
  }
      getOverallRating(ratingId: number) {
        switch (ratingId) {
          case 1:
        this.hrRating = "Outperforms expectations (expectational)";
        break;
      case 2:
        this.hrRating = "Exceeds expectation";
        break;
      case 3:
        this.hrRating = "Meets expectation";
        break;
      case 4:
        this.hrRating = "Needs improvement";
        break;
      case 5:
        this.hrRating = "Unsatisfactory";
        break;
        }
      }
  getRatingDetails(payload) {
    this._homeServices.GetMasterRating(payload).subscribe((r) =>{
      this.pMS_Usr_Rating = r;
     // console.log(this.pMS_Usr_Rating)
    });
  }
  getKPIDetails(payload) {
    this.isLoade = true;
    this._homeServices.getAssociateDetails(null).subscribe(r => {
      this.managerDetails = r
    });
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
      this.pMS_EmpSelf_RequisitionKpiDetails = this.pMS_RequisitionKpiDetails.filter(x => !x.managerKPI);
      this.pMS_Mgr_RequisitionKpiDetails = this.pMS_RequisitionKpiDetails.filter(x => x.managerKPI);
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

  changeRating(e) {
    this.isRateYourAssociate = e.target.value;
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
      "IsAsscoaite": true,
      "QuarterId": getQc['id'],
      "pMSRequisitionComments": [],
      
    }
//console.log(obj['pMS_RequisitionKpiDetails'])
    payload.pMSRequisitionComments = obj['pMS_RequisitionKpiDetails'].map((d: any) => ({
      "RequisitionId": d.requisitionId,
      "RequisitionDetailsId": d.requisitionDetailsId,
      "AssociateComment": d.ass_cmt,
      "ManagerComment": d.mngr_cmt || ""
    })
    );
    this.managerId = this.managerDetails && this.managerDetails.reportingManagerId
    
    if(this.isUserManager && !this.isPersonal) {
      let payload = {
        "AsscoaiteId": userID,
        "ScaleId":null,
        "QuarterId": getQc['id'].toString(),
        'RatingId': this.isRateYourAssociate && this.isRateYourAssociate.toString(),
        'IsPromoted': this.isPromotionRecommendation,
        'Justification': this.ratingJustification,
        'DiscussedDate': this.discussedDate,
        'ManagerId': this.managerId && this.managerId.toString()
      }
      this._homeServices.PostPMSManagerScaleRating(payload).subscribe(res => {
        let payload = {
          "AsscoaiteId": userID,
          "QuarterId": getQc['id'].toString()
        }
        this._homeServices.GetPMSManagerScaleRating(payload).subscribe(data => {
          this.isPromotionRecommendation = data['isPromoted'];
          this.isRateYourAssociate = data['ratingId'];
          this.ratingJustification = data['justification'];
        })
      })
    }

    this._homeServices.SaveRequisitionComments(payload).subscribe(data => {
      this.isAPILoad = false;
      this._alert.succuss("Self Appraisal Form Submitted successfully");
      this.resetAllFields();

    })
  

  }

  ngOnChanges() {
  }

  recommendChange(event: any) {
    let pEdata = this._dataService.getPerformanceEvaluation();
    // this.pMSRequisitionRatingDetails.push(this.ratingJustification);
    // this.pMSRequisitionRatingDetails.push(this.isPromotionRecommendation);
    // this.pMSRequisitionRatingDetails.push(this.isRateYourAssociate);
    // pEdata['pMSRequisitionRatingDetails'] =  this.pMSRequisitionRatingDetails;
    pEdata['DiscussedDate'] = this.discussedDate;
    pEdata['isPersonal'] = this.isPersonal;
    pEdata['isUserManager'] = this.isUserManager;
    pEdata['isPromotionRecommendation'] = this.isPromotionRecommendation;
    pEdata['ratingJustification'] = this.ratingJustification;
    pEdata['isRateYourAssociate'] = this.isRateYourAssociate;
    this._dataService.setPerformanceEvaluation(pEdata);
    this.checkValidation();
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
    pEdata['isPersonal'] = this.isPersonal;
    pEdata['isUserManager'] = this.isUserManager;
    pEdata['isPromotionRecommendation'] = this.isPromotionRecommendation;
    pEdata['ratingJustification'] = this.ratingJustification;
    pEdata['isRateYourAssociate'] = this.isRateYourAssociate;
    this._dataService.setPerformanceEvaluation(pEdata);
    this.checkValidation();
  }
  resetAllFields() {

    let qDetails = this._session.getCurrentQuarterDetails();
    this._homeServices.UIShouldUpadate({ type: 'CLEAR_DATA', data: qDetails });
    this.getKPIDetails({ "QuarterId": qDetails['id'], "AssociateId": this.associateID });
  }



}
