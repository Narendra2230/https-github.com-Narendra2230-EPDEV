import { Injectable } from '@angular/core';
import { HttpClientUtil } from 'src/app/utils/http-client';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'src/app/constants/app-contants';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) { }

  GetEmpClientProjectNames(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetProjectdtlsbyEmp`, payload, this._httpUtil.getAuthHeaders());
  }

  GetShiftDtlsProjectWise(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetShiftDtlsProjectWise`, payload, this._httpUtil.getAuthHeaders());
  }

  GetHoursbyEmpBillcycle(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetHoursbyEmpBillcycle`, payload, this._httpUtil.getAuthHeaders());
  }
  PostEmpTimesheet(payload) {
    console.log(payload)
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/PostEmpTimesheet`, payload, this._httpUtil.getAuthHeaders());
  }
  PutEmpTimesheet(payload) {
    return this._httpUtil.doCall("PUT", `${APP_CONSTANTS.apiHost}/Timesheet/PutEmpTimesheet`, payload, this._httpUtil.getAuthHeaders());
  }
  GetEmpTimesheet(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetEmpTimesheet`, payload, this._httpUtil.getAuthHeaders());
  }

  GetTimesheetEntryPendingDates(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Associate/GetTimesheetEntryPendingDates`, payload, this._httpUtil.getAuthHeaders());
  }

  GetglobalDate(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetglobalDate`, payload, this._httpUtil.getAuthHeaders());
  }

  GetDates(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetDates`, payload, this._httpUtil.getAuthHeaders());
  }

  GetManagerDasboardBar(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/GetManagerDasboardBar`, payload, this._httpUtil.getAuthHeaders());
  }
  GetTimeSheetFilters(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/GetTimeSheetFilters`, payload, this._httpUtil.getAuthHeaders());
  }

  GetTimesheetAllocationStatus(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/GetTimesheetAllocationStatus`, payload, this._httpUtil.getAuthHeaders());
  }

  ViewManagerTimesheetMasterData(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/ViewManagerTimesheetMasterData`, payload, this._httpUtil.getAuthHeaders());
  }
  TimesheetManagerAssociatePendingCount(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/TimesheetManagerAssociatePendingCount`, payload, this._httpUtil.getAuthHeaders());
  }
  TimesheetManagerApprove(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/TimesheetManagerApprove`, payload, this._httpUtil.getAuthHeaders());
  }
  ViewManagerTimesheetAssociateData(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/ViewManagerTimesheetAssociateData`, payload, this._httpUtil.getAuthHeaders());
  }
  UploadTimesheet(payload) {
    return this._httpUtil.doCall("POST", `http://epstaging.suneratech.com/MasterTimesheet/UploadTimesheet`, payload, { });
  }
  TimesheetMonthOrPayrollBulckApproval(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/TimesheetMonthOrPayrollBulckApproval`, payload, this._httpUtil.getAuthHeaders());
  }

  PostDelTimesheet(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/PostDelTimesheet`, payload, this._httpUtil.getAuthHeaders());
  }

  GetTotalHrsbyDates(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetTotalHrsbyDates`, payload, this._httpUtil.getAuthHeaders());
  }

  GetCloneTimesheet(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetCloneTimesheet`, payload, this._httpUtil.getAuthHeaders());
  }

  GetEmpTimesheetdownloads(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetEmpTimesheetdownloads`, payload, this._httpUtil.getAuthHeaders());
  }

  TimesheetVersionAcceptance(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/TimesheetVersionAcceptance`, payload, this._httpUtil.getAuthHeaders());
  }

  GetApprovalEligibility(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetApprovalEligibility`, payload, this._httpUtil.getAuthHeaders());
  }

  IsTimesheetLocked(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/IsTimesheetLocked`, payload, this._httpUtil.getAuthHeaders());
  }


  getAssociateLeaveDetails(payload) {

    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/getAssociateLeaveDetails`, payload, this._httpUtil.getAuthHeaders());
  }

   actionOnLeave(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/actionOnLeave`, payload, this._httpUtil.getAuthHeaders());
  }

  leaveBalanceDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/LeaveBalanceDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  associateLeaveBalance(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/associateLeaveBalance`, payload, this._httpUtil.getAuthHeaders());
  }

   GetLeaveTypes(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/GetLeaveTypes`, payload, this._httpUtil.getAuthHeaders());
  }
  GetHolidayList(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/GetHolidayList`, payload, this._httpUtil.getAuthHeaders());
  }
  getOptionalHoliday(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/getOptionalHoliday`, payload, this._httpUtil.getAuthHeaders());
  }

  GetReasons(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/GetReasons`, payload, this._httpUtil.getAuthHeaders());
  }

  postAssociateLeaveDtls(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Leave/postAssociateLeaveDtls`, payload, this._httpUtil.getAuthHeaders());
  }

  /* Recently added */

  ApproveAssociateShiftDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/ApproveAssociateShiftDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  AssociateShiftDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/AssociateShiftDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  GetShiftDetailsById(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/GetShiftDetailsById`, payload, this._httpUtil.getAuthHeaders());
  }

  PostAssociateShiftDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/PostAssociateShiftDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  GetAssociateLTSHIstory(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/Manager/GetAssociateLTSHIstory`, payload, this._httpUtil.getAuthHeaders());
  }

  //Shift Roster - start
  GetProjectDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/GetProjectDetails`, payload, this._httpUtil.getAuthHeaders());
  }

  PostProjectShiftDetails(payload) {
    return this._httpUtil.doCall("POST", `${APP_CONSTANTS.apiHost}/Timesheet/PostProjectShiftDetails`, payload, this._httpUtil.getAuthHeaders());
  }
  //shift Roster - End

}
