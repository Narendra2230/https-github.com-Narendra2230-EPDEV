import { Injectable } from '@angular/core';
import { HttpClientUtil } from 'src/app/utils/http-client';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'src/app/constants/app-contants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) { }

  GetEmpPersonalInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpPersonalInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  PutEmpPersonalInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PutEmpPersonalInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEmpKYCInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpKYCInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  PutEmpKYCInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PutEmpKYCInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PostEmpKYCInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpKYCInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEmpDependentInfo(payload) {

    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpDependentInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  PutEmpDependentInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PutEmpDependentInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PostEmpDependentInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpDependentInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  GetEmpAssociateInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpAssociateInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PutEmpAssociateInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostAssDtlUpdation`, payload, this._httpUtil.getAuthHeaders());
  }
  PutEmpAssociateSkill(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostAssociateSkill`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEmpEmergancyContactInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpEmergancyContactInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  PutEmergancyContactInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PutEmergancyContactInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PostEmergancyContactInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmergancyContactInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEmpPresentAddressInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpPresentAddressInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PutEmpAddressDetailsInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PutEmpAddressDetailsInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PostEmpAddressDetailsInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpAddressDetailsInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  GetEmpEducationInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpEducationInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PutEmpEducationInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PutEmpEducationInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  PostEmpEducationInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpEducationInfo`, payload, this._httpUtil.getAuthHeaders());
  }


  GetEmpCertificationInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpCertificationInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  PostOrPutEmpCertificationInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostOrPutEmpCertificationInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  DeleteEmpCertificationInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/DeleteEmpCertificationInfo`, payload, this._httpUtil.getAuthHeaders());
  }
  GetEmpPreviousOrganizations(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpPreviousOrganizations`, payload, this._httpUtil.getAuthHeaders());
  }
  PostOrPutEmpPreviousOrganizations(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostOrPutEmpPreviousOrganizations`, payload, this._httpUtil.getAuthHeaders());
  }
  DeleteEmpPreviousOrganizations(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/DeleteEmpPreviousOrganizations`, payload, this._httpUtil.getAuthHeaders());
  }
  GetEmpAssetDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpAssetDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  //Allocation details
  GetEmpAllocationDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpAllocationDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  //Travel Details
  GetEmployeeTravelDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmployeeTravelDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  PostEmpTravelDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpTravelDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  PostEmpIDLDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpIDLDetails`, payload, this._httpUtil.getAuthHeaders());
  }


  GetAssDashboardInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetAssDashboardInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  GetHRAssociatedtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetHRAssociatedtls`, payload, this._httpUtil.getAuthHeaders());
  }

  GetDropDownValues(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetDropDownValues`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEMPOnboardingDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEMPOnboardingDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEmpCompensationDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpCompensationDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  PostEmpCompensationDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpCompensationDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEMPInsuranceInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEMPInsuranceInfo`, payload, this._httpUtil.getAuthHeaders());
  }


  GetEmpBankDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpBankDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  PostEmpBankDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpBankDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEmpCompensationHistDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEmpCompensationHistDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  PostNewEmpProfileDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostNewEmpProfileDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  GetOnBoardingDocs(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetOnBoardingDocs`, payload, this._httpUtil.getAuthHeaders());
  }

  GetOnBoardingEmpUploadedDocs(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetOnBoardingEmpUploadedDocs`, payload, this._httpUtil.getAuthHeaders());
  }

  GetIndianEmpInsuranceDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetIndianEmpInsuranceDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  PostUSEmpInsuranceInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostUSEmpInsuranceInfo`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEMPId(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetEMPId`, payload, this._httpUtil.getAuthHeaders());
  }

  PostOnBoardingDocs(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostOnBoardingDocs`, payload, this._httpUtil.getAuthHeaders());
  }

  DelOnboardUploadedDoc(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/DelOnboardUploadedDoc`, payload, this._httpUtil.getAuthHeaders());
  }

  GenFileUpload(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GenFileUpload`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }


  getEmpInsuWaiverDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/getEmpInsuWaiverDtls`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }


  PostEmpInsuWaiverDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostEmpInsuWaiverDtls`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  InactivateAssociate(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/InactivateAssociate`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  GetLocation(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetLocation`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  GetDependencyDropDownValues(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetDependencyDropDownValues`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  GetBillableHoursYearly(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetBillableHoursYearly`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  GetFinanceAssociateInfo(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetFinanceAssociateInfo`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  GetDependencyBTUManagers(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/GetDependencyBTUManagers`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  GetEmployeeSkills(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateSkills/GetAssociateSkill`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  UpdateEmployeeSkills(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateSkills/PostAssociateSkill`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  DeleteEmployeeSkill(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateSkills/DeleteAssociateSkill`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  GetFunctionalDropDownValues(): Observable<any> {
    return this._http.get(
      `${APP_CONSTANTS.apiHost}/AssociateSkills/GetFunctionalSkills`,this._httpUtil.getAuthHeaders()
    );
  }

  GetFunctionalSkill(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateSkills/GetFunctionalSkill`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  UpdateFunctionalSkill(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateSkills/PostFunctionalSkill`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  DeleteFunctionalSkill(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/AssociateSkills/DeleteFunctionalSkill`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }

  updateResume(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/ProfileAssociate/PostAssociateResume`, payload, this._httpUtil.getAuthHeadersFileUpload());
  }
}
