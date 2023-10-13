export class courseformVM {
  courseId: number = 0;
  title: string = "";
  date: Date = new Date();
  startTime: any;
  endTime: any;
  trainingType: string = "";
  courseType: string = "";
  trainer: string = "";
  duration: any;
  courseURL: string = "";
  courseImage: any;
}
export class CourseTile {
  courseId: number = 0;
  courseImage: string = "";
  courseStatus: boolean = false;
  title: string = "";
  duration: any;
  date: string='';
  startTime: any;
  endTime: any;
  courseType: string = "";
  trainer: string = "";
  trainingType: string = "";
  courseUrl: string = "";
  status: boolean = false;
  enrollment: number = 0;
  completed: number = 0;
  review: number = 0;
}
export class EnrolledAssociateDTO {
  courseId: number = 0;
  courseName: string = "";
  status: boolean = false;
  employeeName: string = "";
  employeeId: number = 0;
  emp_Id: number = 0;
  duration: string = "";
  trainingType: string = "";
}
export class AssociateEnrollmentDTO {
  courseId: number = 0;
  date: Date = new Date();
  title: string = "";
  courseType: string = "";
  trainingMode: string = "";
  trainer: string = "";
  duration: string = "";
  status: string = "";
  reviewed: number = 0;
}

export class CourseCalendar {
  date: Date = new Date();
  active: boolean = false;
  courseName: string = "";
}
export class CourseReview {
  courseReviewQuestionsId: number = 0;
  question: string = "";
  type: string = "";
  answer: number = 0;
  comment: string = "";
  valid: boolean = false;
  courseQuestionId: number = 0;
}
export class CourseReviewDTO {
  courseId: number = 0;
  courseName: string = "";
  trainer: string = "";
  averageRating: number = 0;
  reviewList: CourseReviewList[] = [];
}
export class CourseReviewList {
  answerId: number = 0;
  employeeName: string = "";
  courseReview: CourseReview[] = [];
}

export class CourseProgress {
  courseType: string = "";
  percentage: number = 0;
}
