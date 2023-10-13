import { Injectable } from '@angular/core';
import { HttpClientUtil } from 'src/app/utils/http-client';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'src/app/constants/app-contants';
import { of } from 'rxjs';
//let EsiData = require('./../../data/GetESIData.json');


@Injectable({
  providedIn: 'root'
})
export class EsiService {

   constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) { }

 
   PushESIdata(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ESIInformation/PostESIINvoice`, payload, this._httpUtil.getAuthHeaders());
//    return of(EsiData);
  }  

  GetESIdata(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ESIInformation/GetESIData`, payload, this._httpUtil.getAuthHeaders());
//    return of(EsiData);
  }

  DeActivateInvoice(payload) {   
        return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ESIInformation/DeActivateInvoice`, payload, this._httpUtil.getAuthHeaders());
        //return of(EsiData);
  }

  RefreshInvoice(payload) {   
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ESIInformation/RefreshInvoice`, payload, this._httpUtil.getAuthHeaders());
    //return of(EsiData);
  }
}
