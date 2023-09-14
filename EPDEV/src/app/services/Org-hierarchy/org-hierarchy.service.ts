import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, } from "@angular/common/http";
import { HttpClientUtil } from './../../utils/http-client';
import { Observable, of } from 'rxjs';
import { APP_CONSTANTS } from './../../constants/app-contants';
//let projectDetails = require('./../../data/GetProjectDetailsbyID.json');

@Injectable({
  providedIn: 'root'
})
export class OrgHierarchyService {
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
  getOrgHierarchy(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/OrgHierarchy`, payload, this._httpUtil.getAuthHeaders());
  }
  getAllEmpDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/GetAllEmpDetails`, payload, this._httpUtil.getAuthHeaders());
  }
  getEmpHierarchy(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/GetEmpHierarchy`, payload, this._httpUtil.getAuthHeaders());
  }
  //Search team
  getEmpNames(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/GetEmpNames`, payload, this._httpUtil.getAuthHeaders());
  }
  
  //Project Hierarchy 
  getProjectDetails(payload){
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/GetProjectDetails`, payload, this._httpUtil.getAuthHeaders());
   // return of(projectDetails);
  }
  getClientHierarchy(payload){
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/GetClientHierarchy`, payload, this._httpUtil.getAuthHeaders());
  }


  //Bu Hierarchy
  GetBUDetails(payload){
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/GetBUDetails`, payload, this._httpUtil.getAuthHeaders());  
  }

  getBuHierarchy(payload){
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/GetBUHierarchy`, payload, this._httpUtil.getAuthHeaders());  
  }
  
}
