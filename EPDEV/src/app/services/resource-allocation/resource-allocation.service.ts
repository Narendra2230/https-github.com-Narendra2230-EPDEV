import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/constants/app-contants';
import { HttpClientUtil } from 'src/app/utils/http-client';

@Injectable({
  providedIn: 'root'
})
export class ResourceAllocationService {

  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) {}

  GetResourceAllocations(): Observable<any[]> {
    return this._http.get<any[]>(
      `${APP_CONSTANTS.apiHost}/ResourceAllocation/AllocationListByAssociate`,
      this._httpUtil.getAuthHeaders()
    );
  }
}
