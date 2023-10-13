import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APP_CONSTANTS } from "src/app/constants/app-contants";
import { HttpClientUtil } from "src/app/utils/http-client";

@Injectable({
  providedIn: "root",
})
export class LearningService {
  constructor(private _httpUtil: HttpClientUtil, private _http: HttpClient) {}

  GetCourses(EmployeeId: number): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Learning/GetCourses`,
      {"EmployeeId":EmployeeId},
      this._httpUtil.getAuthHeaders()
    );
  }

  GetCourseReview(courseId: number): Observable<any> {
    return this._http.post<any>(
      `${APP_CONSTANTS.apiHost}/Learning/GetCourseReview`, {"CourseId":courseId},
      this._httpUtil.getAuthHeaders()
    );
  }
  AddFileDetails(payload) {
    return this._httpUtil.doCall(
      "POST",
      `${APP_CONSTANTS.apiHost}/Learning/PostCourse`,
      payload,
      this._httpUtil.getAuthHeadersFileUpload()
    );
  }

  EnrollCourse(payload) {
    return this._httpUtil.doCall(
      "POST",
      `${APP_CONSTANTS.apiHost}/Learning/CourseEnrollment`,
      payload,
      this._httpUtil.getAuthHeadersFileUpload()
    );
  }
  PostAttendance(payload) {
    return this._httpUtil.doCall(
      "POST",
      `${APP_CONSTANTS.apiHost}/Learning/PostAttendance`,
      payload,
      this._httpUtil.getAuthHeadersFileUpload()
    );
  }
  GetEnrolledAssociate(CourseId): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Learning/GetEnrolledAssociate`,
      {"CourseId":CourseId},
      this._httpUtil.getAuthHeaders()
    );
  }
  GetAssociateEnrollment(EmployeeId): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Learning/GetAssociateEnrollment`,
      {"EmployeeId":EmployeeId},
      this._httpUtil.getAuthHeaders()
    );
  }
  getEmployeeDetail(EmployeeId): Observable<any> {
    return this._http.post<any>(
      `${APP_CONSTANTS.apiHost}/Learning/GetEmployeeDetails`,
      {"EmployeeId":EmployeeId},
      this._httpUtil.getAuthHeaders()
    );
  }
  GetReviewQuestions(EmployeeId, CourseId, Type): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Learning/GetReviewQuestions`,
      {
        "EmployeeId":EmployeeId,
        "CourseId":CourseId,
        "Type":Type
      },
      this._httpUtil.getAuthHeaders()
    );
  }
  GetCourseProgress(EmployeeId): Observable<any[]> {
    return this._http.post<any[]>(
      `${APP_CONSTANTS.apiHost}/Learning/Associate/Progress`,
      {"EmployeeId":EmployeeId},
      this._httpUtil.getAuthHeaders()
    );
  }
  PostReview(payload, EmployeeId, CourseId) {
    return this._httpUtil.doCall(
      "POST",
      `${APP_CONSTANTS.apiHost}/Learning/PostReview/${EmployeeId}/${CourseId}`,
      payload,
      this._httpUtil.getAuthHeadersFileUpload()
    );
  }
  UpdateStatus(payload) {
    return this._httpUtil.doCall(
      "POST",
      `${APP_CONSTANTS.apiHost}/Learning/UpdateCourse`,
      payload,
      this._httpUtil.getAuthHeadersFileUpload()
    );
  }
}
