import { Injectable } from '@angular/core';
import { HttpClientUtil } from 'src/app/utils/http-client';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'src/app/constants/app-contants';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) { }

  GetLeaveTypes(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/GetLeaveTypes`, payload, this._httpUtil.getAuthHeaders());
  }
  GetHolidayList(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/GetHolidayList`, payload, this._httpUtil.getAuthHeaders());
  }
  getOptionalHoliday(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/getOptionalHoliday`, payload, this._httpUtil.getAuthHeaders());
  }
  getAssociateLeaveDetails(payload) {
    
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/getAssociateLeaveDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  GetReasons(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/GetReasons`, payload, this._httpUtil.getAuthHeaders());
  }
  postAssociateLeaveDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/postAssociateLeaveDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  managerLeaveView(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/managerLeaveView`, payload, this._httpUtil.getAuthHeaders());
  }

  actionOnLeave(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/actionOnLeave`, payload, this._httpUtil.getAuthHeaders());
  }
  associateLeaveBalance(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/associateLeaveBalance`, payload, this._httpUtil.getAuthHeaders());
  }
  leaveBalanceDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/LeaveBalanceDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  associatesOnLeave(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/associatesOnLeave`, payload, this._httpUtil.getAuthHeaders());
  }

  encashLeaves(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/AssociateELencashment`, payload, this._httpUtil.getAuthHeaders());
  }
}
