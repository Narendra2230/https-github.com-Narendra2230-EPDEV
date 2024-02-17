import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APP_CONSTANTS } from "src/app/constants/app-contants";
import { HttpClientUtil } from "src/app/utils/http-client";

@Injectable({
  providedIn: "root",
})
export class AssociateAllocationService {
  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) {}

  GetAssociateAllocation(): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/project/GetSOWEMPViewDetails`,
      {},
      this._httpUtil.getAuthHeaders()
    );
  }
  GetAssociateEmpAllocation(EMPID): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/project/GetEMPSOWAllocDetails`,
      {
        EMPID: EMPID,
      },
      this._httpUtil.getAuthHeaders()
    );
  }
  GetAssociateAllocationAging(StartDate, EndDate): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/project/Get_Associate_Allocation_Aging`,
      { StartDate: StartDate, EndDate: EndDate },
      this._httpUtil.getAuthHeaders()
    );
  }
}
