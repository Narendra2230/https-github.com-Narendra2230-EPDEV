import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APP_CONSTANTS } from "src/app/constants/app-contants";
import { HttpClientUtil } from "src/app/utils/http-client";

@Injectable({
  providedIn: "root",
})
export class ProductsServiceService {
  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) {}

  GetProductDropdownValues(): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Product/GetProductDropdownValues`,
      {},
      this._httpUtil.getAuthHeaders()
    );
  }
  GetProductAdminDashboard(): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Product/GetProductAdminDashboard`,
      {
        ProductID: 0,
      },
      this._httpUtil.getAuthHeaders()
    );
  }
  GetProductReviewTicket(): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Product/GetProductReviewTicket`,
      {},
      this._httpUtil.getAuthHeaders()
    );
  }
  GetProductReviewTicketByRequestId(Id): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Product/GetProductReviewTicket`,
      {
        TicketId: 0,
        EmpId: 0,
        RequesterId: Id,
      },
      this._httpUtil.getAuthHeaders()
    );
  }

  GetProductReviewTicketByEmpId(Id): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Product/GetProductReviewTicket`,
      {
        TicketId: 0,
        EmpId: Id,
      },
      this._httpUtil.getAuthHeaders()
    );
  }
  GetProductReviewTicketByTicketId(Id): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Product/GetProductReviewTicket`,
      {
        TicketId: Id,
        EmpId: 0,
      },
      this._httpUtil.getAuthHeaders()
    );
  }
  GetProductTicketHistoryByTicketId(Id): Observable<any> {
    return this._http.post<any>(
      `${APP_CONSTANTS.apiHost}/Product/GetProductTicketHistory`,
      {
        TicketId: Id,
      },
      this._httpUtil.getAuthHeaders()
    );
  }
  PostTicket(payload) {
    return this._httpUtil.doCall(
      "POST",
      `${APP_CONSTANTS.apiHost}/Product/PostPrdReviewTicketInfo`,
      payload,
      this._httpUtil.getAuthHeadersFileUpload()
    );
  }
  PutPrdReviewTicket(payload) {
    return this._httpUtil.doCall(
      "PUT",
      `${APP_CONSTANTS.apiHost}/Product/PutPrdReviewTicket`,
      payload,
      this._httpUtil.getAuthHeadersFileUpload()
    );
  }
}
