import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { LearningRouts } from './routes/learning-routs';
import { CourseAttendanceComponent } from './components/course-attendance/course-attendance.component';
import { AssociatePageComponent } from './components/associate-page/associate-page.component';
import { CourseEnrollmentComponent } from './components/course-enrollment/course-enrollment.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Time24to12Pipe } from './pipe/time24to12.pipe';
import { MatProgressBarModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { AssociateCourseReviewComponent } from './components/associate-course-review/associate-course-review.component';
import { AdminHrPageComponent } from './components/admin-hr-page/admin-hr-page.component';
import { AdminCourseReviewComponent } from './components/admin-course-review/admin-course-review.component';
import { CourseHoursRenderer } from './components/course-attendance/course-hours-renderer';
import { CourseStatusRenderer } from './components/course-attendance/course-status-renderer';
import { CourseActionButtonRenderer } from './components/admin-page/course-action-button-renderer';
import { AdminCourseStatusRenderer } from './components/admin-page/admin-course-status-renderer';
import { EBooksComponent } from './components/e-books/e-books.component';
import { iconRenderer } from './components/e-books/iconRenderer';

@NgModule({

  declarations: [AdminPageComponent, CourseAttendanceComponent, AssociatePageComponent, CourseEnrollmentComponent, CourseFormComponent, Time24to12Pipe, AssociateCourseReviewComponent, AdminHrPageComponent, AdminCourseReviewComponent,CourseHoursRenderer,CourseStatusRenderer,AdminCourseStatusRenderer,CourseActionButtonRenderer, EBooksComponent,iconRenderer],

  imports: [
    CommonModule,
    LearningRouts,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    AgGridModule.withComponents([CourseHoursRenderer,CourseStatusRenderer,CourseActionButtonRenderer,AdminCourseStatusRenderer,iconRenderer])
  ]
})
export class LearningDevelopmentModule { }
