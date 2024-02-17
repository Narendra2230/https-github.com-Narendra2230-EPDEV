import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { APP_CONSTANTS } from './../../constants/app-contants';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private STORE_KEY: String = APP_CONSTANTS.userSessionKey;
  private STORE_TOKEN_KEY: String = APP_CONSTANTS.userTokenKey;
  private userName: String = null;
  private userID: String = null;
  private userEmail: String = null;
  private token: String = null;
  private currentQuaterDetails: Object = null;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  public getUserName() {
    const { firstName = '', lastName = '' } = this.getSessionDetails();
    return `${firstName} ${lastName}`;
  }
  public getUserNameWithUnderScore() {
    const { firstName = '', lastName = '' } = this.getSessionDetails();
    return `${firstName}_${lastName}`;
  }
  public getUserPick() {
    const { profileImage = '' } = this.getSessionDetails();
    return profileImage;
  }

  public getUserLocation() {
    const { location = '' } = this.getSessionDetails();
    return location;
  }

  
  getCurrentQuarterDetails() {
    return JSON.parse(this.storage.get("selected-quarter"));
  }
  setCurrentQuarterDetails(data: Object) {
    this.storage.set("selected-quarter", JSON.stringify(data));
  }
  public getUserID(): String {
    const { associateId = '', id = '' } = this.getSessionDetails();
    return id;
  }
  public getAssociateId(): String {
    const { associateId = '', id = '' } = this.getSessionDetails();
    return associateId;
  }
  public isUserManager() {
    const { reporteeCount = 0 } = this.getSessionDetails();
    return reporteeCount > 0;
  }
  public isUserAssociate() {
    const { reporteeCount = 0 } = this.getSessionDetails();
    return reporteeCount === 0;
  }
  public getToken(): String {
    let { access_token } = this.getTokenDetails();
    return access_token;
  }
  public isTokenAvaialable() {
    let { access_token = null } = this.getTokenDetails();
    return access_token !== null;
  }
  public isUserLoggerIn(): boolean {
    const uSessionDetails = this.getSessionDetails();
    if (uSessionDetails !== null) {
      return true;
    }
    return false;
  }
  public storeAuthToken(data: any) {
    this.storage.set(this.STORE_TOKEN_KEY.toString(), JSON.stringify(data));
  }
  public getTokenDetails() {
    return JSON.parse(this.storage.get(this.STORE_TOKEN_KEY.toString())) || {};
  }
  public getBearerToeken() {
    return `Bearer ${this.getToken()}`;
  }
  public getBasicToeken() {
    return `Basic ${this.getToken()}`;
  }
  public storeSessionDetails(data: Object) {
    this.storage.set(this.STORE_KEY.toString(), JSON.stringify(data));
  }
  public getSessionDetails() {
    return JSON.parse(this.storage.get(this.STORE_KEY.toString())) || null;
  }
  public logOut() {
    this.storage.remove(this.STORE_KEY.toString());
    this.storage.remove(this.STORE_TOKEN_KEY.toString());
    localStorage.clear();
    sessionStorage.clear();
  }
  public storeIsPersonal(data: Object) {
    this.storage.set("is-personal", JSON.stringify(data));
  }
  public getStoreIsPersonal() {
    return JSON.parse(this.storage.get("is-personal")) || {};
  }
  public storeSelfDetails(data: Object) {
    this.storage.set("is-self", JSON.stringify(data));
  }
  public getStoreSelfDetails() {
    return JSON.parse(this.storage.get("is-self")) || {};
  }
  public storeManagerDetails(data: Object) {
    this.storage.set("is-manager", JSON.stringify(data));
  }
  public getStoreManagerDetails() {
    return JSON.parse(this.storage.get("is-manager")) || {};
  }
  public storeFinalRating(data: Object) {
    this.storage.set("final-rating", JSON.stringify(data));
  }
  public getFinalRating() {
    return JSON.parse(this.storage.get("final-rating")) || {};
  }
  public storeSelectedEmpDetails(data: Object) {
    this.storage.set("selected-emp", JSON.stringify(data));
  }
  public getSelectedEmpDetails() {
    return JSON.parse(this.storage.get("selected-emp")) || {};
  }
  public storeEvalutionData(data: Object) {
    this.storage.set("evalution-data", JSON.stringify(data));
  }
  public getEvalutionData() {
    return JSON.parse(this.storage.get("evalution-data")) || {};
  }
  public setClickTIme() {
    this.storage.set("click-time", JSON.stringify({ clicked: true, time: new Date() }));
  }

  public getClickTime() {
    return JSON.parse(this.storage.get("click-time")) || {};
  }

  public storeSelectedGlobalTimeDetails(data: Object) {
    this.storage.set("GLOBAL_TIME_RANGE", JSON.stringify(data));
  }
  public getSelectedGlobalTimeDetails() {
    return JSON.parse(this.storage.get("GLOBAL_TIME_RANGE")) || {};
  }

  public getDateOfJoining(){
    return JSON.parse(JSON.parse(localStorage.getItem('USER_SESSION_DETAILS'))).dateOfJoining
  }

}
