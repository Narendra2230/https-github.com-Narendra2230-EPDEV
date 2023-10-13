import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { LearningService } from "src/app/services/learning/learning.service";
import { CourseCalendar, CourseTile } from "../../model/courseformVM";

@Component({
  selector: "app-course-enrollment",
  templateUrl: "./course-enrollment.component.html",
  styleUrls: ["./course-enrollment.component.css"],
})
export class CourseEnrollmentComponent implements OnInit {
  ListOfCourse: CourseTile[] = [];
  ListOfCourse1: CourseTile[] = [];
  ListDate: CourseCalendar[] = [];
  ListType: string[] = [];
  ListMode: string[] = [];
  TrainerList: string[] = [];
  emptyDays: number[] = [];
  todate: Date = new Date();
  todate1: Date = new Date();
  type: string = "";
  trainigType: string = "";
  trainer: string = "";
  Id: any;
  firstDayOfSelected: number = 0;
  filtered: boolean = false;
  constructor(
    private learningService: LearningService,
    private _alert: AlertMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    let user = localStorage.getItem("USER_SESSION_DETAILS").toString();
    let JsonUser = JSON.parse(user);
    var halfPart = JsonUser.toString().split('"id":')[1].split(",")[0];
    this.Id = halfPart;
    this.GetCourses();
    this.daysInMonth(this.todate.getMonth(), this.todate.getFullYear());
    this.EmptyDates(this.todate);
  }
  EmptyDates(date: Date) {
    this.firstDayOfSelected = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
    this.emptyDays = [];
    var date3 = this.firstDayOfSelected - 1;
    for (let i = 0; i < date3; i++) {
      this.emptyDays.push(i);
    }
  }
  prev() {
    this.ListDate = [];
    this.todate.setMonth(this.todate.getMonth() - 1);
    this.daysInMonth(this.todate.getMonth(), this.todate.getFullYear());
    this.EmptyDates(this.todate);
    this.filtered = true;
    this.updateEvent();
  }
  next() {
    this.ListDate = [];
    this.todate.setMonth(this.todate.getMonth() + 1);
    this.daysInMonth(this.todate.getMonth(), this.todate.getFullYear());
    this.EmptyDates(this.todate);
    this.filtered = true;
    this.updateEvent();
  }ChangeType() {
    if (this.trainigType != "" && this.trainer != "" && this.type == "") {
      this.filtered = true;
      var ListOfCourses = this.ListOfCourse1.filter((data) => {
        return (
          data.courseType == this.type &&
          data.trainer == this.trainer &&
          data.trainingType == this.trainigType
        );
      });
      this.ListOfCourse = ListOfCourses;
    } else if (this.trainigType != "" && this.type == "") {
      this.filtered = true;
      var ListOfCourses = this.ListOfCourse1.filter((data) => {
        return (
          data.courseType == this.type && data.trainingType == this.trainigType
        );
      });
      this.ListOfCourse = ListOfCourses;
    } else if (this.type == "") {
      this.filtered = true;
      var ListOfCourses = this.ListOfCourse1.filter((data) => {
        return data.courseType == this.type;
      });
      this.ListOfCourse = ListOfCourses;
    } else {
      this.filtered = false;
      this.ListOfCourse = this.ListOfCourse1;
    }
  }
  clearFilter() {
    this.ListOfCourse = this.ListOfCourse1;
    this.trainer = "";
    this.type = "";
    this.trainigType = "";
    this.filtered = false;
  }
  SortbyDate(date) {
    var date5 = new Date(date);
    console.log(date5);
    var ListOfCourses = this.ListOfCourse1.filter((data) => {
      var date6 = new Date(data.date);
      return (
        date6.getDate() == date5.getDate() &&
        date6.getMonth() == date5.getMonth()
      );
    });
    this.ListOfCourse = ListOfCourses;
    this.filtered = true;
  }
  GetCourses() {
    this.learningService.GetCourses(this.Id).subscribe((data: CourseTile[]) => {
      this.ListOfCourse = data;
      this.ListOfCourse1 = data;
      var ListType = data.map(function (el) {
        return el.courseType;
      });
      this.ListType = ListType.filter(this.onlyUnique);
      var ListMode = data.map(function (el) {
        return el.trainingType;
      });
      this.ListMode = ListMode.filter(this.onlyUnique);
      var TrainerList = data.map(function (el) {
        return el.trainer;
      });
      this.TrainerList = TrainerList.filter(this.onlyUnique);
      this.updateEvent();
    });
  }
  updateEvent() {
    for (let i = 0; i < this.ListOfCourse.length; i++) {
      this.ListDate.map((item) => {
        var date4 = new Date(this.ListOfCourse[i].date);
        if (
          date4.getDate() == item.date.getDate() &&
          date4.getMonth() == item.date.getMonth()
        ) {
          item.active = true;
          item.courseName = this.ListOfCourse[i].title;
        }
      });
    }
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  daysInMonth(month, year) {
    // Use 1 for January, 2 for February, etc.
    var days = new Date(year, month + 1, 0).getDate();
    console.log(days);
    for (let i = 0; i < days; i++) {
      let y = i + 1;
      var courseDate = new CourseCalendar();
      (courseDate.active = false),
        (courseDate.courseName = ""),
        (courseDate.date = new Date(year, month, y));
      this.ListDate.push(courseDate);
    }
    return this.ListDate;
  }
  EnrollClick(CourseId, i) {
    this.ListOfCourse[i].status = false;
    var EnrollmentCourse = {
      courseId: CourseId,
      employeeId: this.Id,
    };
    this.learningService.EnrollCourse(EnrollmentCourse).subscribe((data) => {
      this._alert.succuss("Course enrollment successfully.");
      this.router.navigate(["/associate-learning"]);
    });
  }
}
