import { Injectable } from '@angular/core';
import { HttpClient, } from "@angular/common/http";
import { HttpClientUtil } from './../../utils/http-client';
let sideMenudata=require('./../../data/side-menu.json');
import { APP_CONSTANTS } from './../../constants/app-contants';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SidenavService {
  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) {

  }
  
   getUserRoles(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/associate/GetUserRoles`, payload, this._httpUtil.getAuthHeaders());
  }
}
