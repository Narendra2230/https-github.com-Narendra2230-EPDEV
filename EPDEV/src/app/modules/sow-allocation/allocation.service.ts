import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APP_CONSTANTS } from "src/app/constants/app-contants";
import { HttpClientUtil } from "src/app/utils/http-client";

@Injectable({
  providedIn: "root",
})
export class AllocationService {
  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) {}

  GetSwoAllocation(): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/project/GetSOWListDetails`,
      {},
      this._httpUtil.getAuthHeaders()
    );
  }
  GetSwoEmployee(sowid): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/project/GetSOWEMPListDetails`,
      {
        SOWID: sowid,
      },
      this._httpUtil.getAuthHeaders()
    );
  }
  GetDurationList(tempStartDate, tempEndDate): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/project/GetSOWDurationDetails`,
      {
        StartDate: tempStartDate,
        EndDate: tempEndDate,
      },

      this._httpUtil.getAuthHeaders()
    );
  }

  GetDurationSOWList(startDate, endDate): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/project/GetEMPSOWDurationDetails`,
      {
        StartDate: startDate,
        EndDate: endDate,
      },
      this._httpUtil.getAuthHeaders()
    );
  }
}
