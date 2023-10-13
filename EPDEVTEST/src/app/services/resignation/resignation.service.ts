import { Injectable } from '@angular/core';
import { HttpClientUtil } from 'src/app/utils/http-client';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'src/app/constants/app-contants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResignationService {

  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) { }

  GetExitAssociateDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateExit/GetExitAssociateDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  GetExitReasons() {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateExit/GetExitReasons`, '', this._httpUtil.getAuthHeaders());
  }

  PostExitAssociateDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateExit/PostExitAssociateDetails`, payload, this._httpUtil.getAuthHeaders());
  }
  GetExitAssociate(): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/AssociateExit/GetExitHRAssociateDetails`,
      {},
      this._httpUtil.getAuthHeaders()
    );
  }
  PostExitHRAssociateLastworkingDay(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateExit/PostExitHRAssociateLastworkingDay`, payload, this._httpUtil.getAuthHeaders());
  }
}
