import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SessionServiceService } from './../services/session/session-service.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpClientUtil {
    constructor(private _http: HttpClient,
        private _session: SessionServiceService) {

    }
    getAuthHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${this._session.getBearerToeken()}`,
                'user_id': " this._session.getUserID()"
            }
        }
    }
    getAuthHeadersFileUpload() {
        return {
            headers: {
              
                'authorization': `${this._session.getBearerToeken()}`,
                'user_id': " this._session.getUserID()"
            }
        }
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }
    }
    doCall(type, url, payload, headers) {
        switch (type) {
            case "GET":
                return this.getCall(url, headers);
                break;
            case "POST":
                return this.postCall(url, payload, headers);
                break;
            case "DELETE":

                break;
            case "PUT":
                return this.putCall(url, payload, headers);
                break;
        }
    }
    // postCall(url, payload, headers) {
    //     return this._http.post(url, payload, headers);
    // }
    // getCall(url, headers) {
    //     return this._http.get(url, headers);
    // }
    // putCall(url,payload, headers) {
    //     return this._http.put(url,payload,headers);
    // }

    postCall(url, payload, headers) {
        return new Observable(subscriber => {
            this._http.post(url, payload, headers).subscribe(res => {
                subscriber.next(res);
                subscriber.complete();
            }, e => {
                const { error,status } = e;
                if(status === 401){
                    window.location.href = 'https://epstaging.suneratech.com'
                }
                subscriber.error(e);
                subscriber.complete();
                //window.location.href = 'https://ep.suneratech.com'
               // window.location.href = 'https://epstaging.suneratech.com'
            })
        });
    }
    getCall(url, headers) {
        return new Observable(subscriber => {
            this._http.get(url, headers).subscribe(res => {
                subscriber.next(res);
                subscriber.complete();
            }, e => {
                const { error, status } = e;
                if(status === 401){
                    window.location.href = 'https://epstaging.suneratech.com'
                }
                subscriber.error(e);
                subscriber.complete();
                //window.location.href = 'https://ep.suneratech.com'
                //window.location.href = 'https://epstaging.suneratech.com'
            })
        });
    }
    putCall(url,payload, headers) {
        return new Observable(subscriber => {
            this._http.put(url, payload, headers).subscribe(res => {
                subscriber.next(res);
                subscriber.complete();
            }, e => {
                const { error, status } = e;
                if(status === 401){
                    window.location.href = 'https://epstaging.suneratech.com'
                }
                subscriber.error(e);
                subscriber.complete();
                //window.location.href = 'https://ep.suneratech.com'
               // window.location.href = 'https://epstaging.suneratech.com'
            })
        });
    }
    
}
