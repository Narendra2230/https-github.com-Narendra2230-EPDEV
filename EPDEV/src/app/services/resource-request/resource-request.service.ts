import { Injectable } from '@angular/core';
import { HttpClientUtil } from 'src/app/utils/http-client';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'src/app/constants/app-contants';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceRequestService {

  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) { }

  GetDropDownValues(): Observable<any> {
    return this._http.get(
      `${APP_CONSTANTS.apiHost}/ResourceRequest/GetDropDownValues`,this._httpUtil.getAuthHeaders()
    );
  }

  GetLandingPageData(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ResourceRequest/GetResourceRequestMasterDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  GetSingleRecord(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ResourceRequest/GetResourceRequest`, payload, this._httpUtil.getAuthHeaders());
  }

  SubmitNewRecord(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ResourceRequest/PostResourceRequestMaster`, payload, this._httpUtil.getAuthHeaders());
  }
  
  UpdateRecord(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ResourceRequest/UpdateResourceRequest`, payload, this._httpUtil.getAuthHeaders());
  }

  GetUserType(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetUserRole`, payload, this._httpUtil.getAuthHeaders());
  }

}
