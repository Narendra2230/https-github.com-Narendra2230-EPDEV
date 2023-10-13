import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, } from "@angular/common/http";
import { HttpClientUtil } from './../../utils/http-client';
import { Observable, of } from 'rxjs';
import { APP_CONSTANTS } from './../../constants/app-contants';
let homeData = require('./../../data/home-data.json');
let empData = require('./../../data/emp-data.json');
let empDdtils = require('./../../data/emp-details.json');
let empDetailsinfodata = require('./../../data/emp-details-info.json');

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  private updateUI: EventEmitter<Object> = new EventEmitter();
  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) {
  }

  UIShouldUpadate(payload) {
    let a = this.updateUI.emit(payload);
    return a;
  }

  getUIShouldUpadateEvent() {
    return this.updateUI;
  }
  getToekDetails() {
let payload = { 'grant_type': "password", 'username': "Ajay.Pusarla", 'password': "sunera"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "bhaskar.ravva", 'password': "sunera"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "saritha.palle", 'password': "sunera"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "swathi.appala", 'password': "sunera"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "swapna.saridi", 'password': "sunera"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "Mallikarjun.Josyula", 'password': "computer"}; //, 'client_id': "EpAngularAuth"
//let payload = { 'grant_type': "password", 'username': "Anitha.Ghosh", 'password': "computer"}; //, 'client_id': "EpAngularAuth"
//let payload = { 'grant_type': "password", 'username': "Sirisha.Mullangi", 'password': "computer"}; //, 'client_id': "EpAngularAuth"
//let payload = { 'grant_type': "password", 'username': "Anitha.Prabhakar", 'password': "computer"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "Hemakiran.Sunkara", 'password': "computer"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "Vamshi.Chinthapatla", 'password': "computer" }; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username':   "subhasish.pradhan",'password': "computer"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "srikanth", 'password':"computer"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "sudheer", 'password':"computer"}; //, 'client_id': "EpAngularAuth"
// let payload = { 'grant_type': "password", 'username': "Sumanth.Allugubelli", 'password':"computer"}; //, 'client_id': "EpAngularAuth"
//let payload = { 'grant_type': "password", 'username': "Saibhaskara.Sabbella", 'password':"computer"}; //, 'client_id': "EpAngularAuth"
//let payload = { 'grant_type': "password", 'username': "Raja.Koduru", 'password':"computer"}; //, 'client_id': "EpAngularAuth"
//let payload = { 'grant_type': "password", 'username': "Sangeetha.Jatovath", 'password':"computer"}; //, 'client_id': "EpAngularAuth"

 let q = Object.keys(payload).map(k => `${k}=${payload[k]}`).join("&")
   return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost2}/token`, q, this._httpUtil.getHeaders());
  }

  /* ------ Common API's -Start  --------- */

  //left menu
  getUserRoles(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/associate/GetUserRoles`, payload, this._httpUtil.getAuthHeaders());
  }

  //Header
  getAssociateDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/associate/GetAssociateDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  /* ------ Common API's -End  --------- */

  /* ------ Associate Flow API's -Start  --------- */

  // project info
  quarterDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/project/GetProjectDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  // Assocaite & Manager - Calnder quarterDetails
  getQuarterDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/project/GetQuarterDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  // paQuarterDetails
   paQuarterDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/paQuarterDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  // Associate GetEvaluationDetails
  getEvaluationDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/project/GetEvaluationDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  // My Performance Evaluation
  getPMSSelfEvaluationList(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/GetPMSSelfEvaluationList`, payload, this._httpUtil.getAuthHeaders());
  }

  //Associate Key Information popup data API
  getAssociatekeyInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/project/GetAssociateKeyInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  //Associate Requisitions list
  getPMSRequisitionList(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/GetPMSRequisitionList`, payload, this._httpUtil.getAuthHeaders());
  }

  // Associate POST Call For SavePMSSelfEvaluation
  SavePMSSelfEvaluation(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SavePMSSelfEvaluation`, payload, this._httpUtil.getAuthHeaders());
  }

  // Associate POST Call For SavePMSComments
  SavePMSComments(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SavePMSComments`, payload, this._httpUtil.getAuthHeaders());
  }


  // Associate POST Call For SaveRequisitionComments
  SaveRequisitionComments(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SaveRequisitionComments`, payload, this._httpUtil.getAuthHeaders());
  }

  // AssociatePOST Call For SendRaiseDiscussionAlert

  SendRaiseDiscussionAlert(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SendRaiseDiscussionAlert`, payload, this._httpUtil.getAuthHeaders());

  }

  // SendKPIRequest

  SendKPIRequest(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SendKPIRequest`, payload, this._httpUtil.getAuthHeaders());

  }

  //ShowAllComments
  ShowAllComments(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/ShowAllComments`, payload, this._httpUtil.getAuthHeaders());

  }

  // UserAcceptance
  UserAcceptance(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/UserAcceptance`, payload, this._httpUtil.getAuthHeaders());

  }

  // UserAcceptance
  SaveUserAcceptance(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SaveUserAcceptance`, payload, this._httpUtil.getAuthHeaders());

  }

  GetKPIRequest(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/GetKPIRequest`, payload, this._httpUtil.getAuthHeaders());

  }

  SaveKpiRequestToManager(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SaveKpiRequestToManager`, payload, this._httpUtil.getAuthHeaders());

  }




  /* ------ Associate Flow API's -End  --------- */



  /* ------ Manager Flow API's -Start  --------- */

  GetPmsCycles(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/manager/GetPmsCycles`, payload, this._httpUtil.getAuthHeaders());
  }
  GetMasterLookupData(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/manager/GetSearchFilters`, payload, this._httpUtil.getAuthHeaders());
  }

  GetReporteeCountByStatus(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/manager/GetReporteeCountByStatus`, payload, this._httpUtil.getAuthHeaders());
  }

  GetSearchFilters(payload, qs) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/manager/GetSearchFilters?${qs}`, payload, this._httpUtil.getAuthHeaders());
  }

  GetMyTeamDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/manager/GetMyTeamDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  GetExecutiveDashboard(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/GetExecutiveDashboard`, payload, this._httpUtil.getAuthHeaders());
  }
  GetExecutiveDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/GetExecutiveDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  SaveAssociateExecutiveRating(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/PMSEvaluation/SaveAssociateExecutiveRating`, payload, this._httpUtil.getAuthHeaders());
  }




  /* ------ Manager Flow API's -End  --------- */

  GetAssignedKPIs(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssignGoals/GetAssignedKPIs`, payload, this._httpUtil.getAuthHeaders());

  }

  SaveAssignKPIs(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssignGoals/SaveAssignKPIs`, payload, this._httpUtil.getAuthHeaders());
  }

  /*----- AssignGoals API - Start-----*/
  // GetListOfPreDefinedMeasures
  GetListOfPreDefinedMeasures(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssignGoals/GetListOfPreDefinedMeasures`, payload, this._httpUtil.getAuthHeaders());
  }
   /*----- AssignGoals API - End-----*/

   GetMasterRating(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/pmsevaluationmanager/GetMasterRating`, payload, this._httpUtil.getAuthHeaders());
  }

  PostPMSManagerScaleRating(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/pmsevaluationmanager/PostPMSManagerScaleRating`, payload, this._httpUtil.getAuthHeaders());
  }

  GetPMSManagerScaleRating(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/pmsevaluationmanager/GetPMSManagerScaleRating`, payload, this._httpUtil.getAuthHeaders());
  }


  empSnapShot() {
    return of(homeData);
  }

  empInfo() {
    return of(empData);
  }

  empDtails() {
    return of(empDdtils);
  }

  empDetailsinfo() {
    return of(empDetailsinfodata);
  }
}
