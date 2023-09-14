import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';
import { AdminCourseReviewComponent } from '../components/admin-course-review/admin-course-review.component';
import { AdminHrPageComponent } from '../components/admin-hr-page/admin-hr-page.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { AssociatePageComponent } from '../components/associate-page/associate-page.component';
import { CourseAttendanceComponent } from '../components/course-attendance/course-attendance.component';
import { CourseEnrollmentComponent } from '../components/course-enrollment/course-enrollment.component';
import { EBooksComponent } from '../components/e-books/e-books.component';

const routes: Routes = [
  { path: 'admin-learning', component: AdminPageComponent },
  { path: 'admin-course-review/:id', component: AdminCourseReviewComponent },
  { path: 'admin-hr-learning', component: AdminHrPageComponent },
  { path: 'admin-attendance/:id', component: CourseAttendanceComponent },
  { path: 'associate-learning', component: AssociatePageComponent },
  { path: 'course-enrollment', component: CourseEnrollmentComponent },
  { path: 'e-books', component: EBooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LearningRouts { }
