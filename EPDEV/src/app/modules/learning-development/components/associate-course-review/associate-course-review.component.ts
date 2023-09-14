import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { LearningService } from "src/app/services/learning/learning.service";
import { CourseReview } from "../../model/courseformVM";

@Component({
  selector: "app-associate-course-review",
  templateUrl: "./associate-course-review.component.html",
  styleUrls: ["./associate-course-review.component.css"],
})
export class AssociateCourseReviewComponent implements OnInit {
  @Input() Id: number = 0;
  @Input() CourseId: number = 0;
  @Input() CourseType: string = "";
  @Input() Trainer: string = "";
  @Input() CourseName: string = "";
  @Output() CloseModal = new EventEmitter();
  @Output() getCourse = new EventEmitter();
  isSubmitted: boolean = false;
  userSubmitted: boolean = false;
  userSubmittedBtn: boolean = false;
  QuestionList: CourseReview[] = [];
  constructor(
    private learningService: LearningService,
    private _alert: AlertMessageService
  ) {}

  ngOnInit() {
    this.GetReviewQuestions(this.Id, this.CourseId, this.CourseType);
  }
  GetReviewQuestions(Id, CourseId, CourseType) {
    console.log(Id,CourseId,CourseType)
    if(CourseId!=0){
      this.learningService
      .GetReviewQuestions(Id, CourseId, CourseType)
      .subscribe((data) => {
        this.QuestionList = data;
        data.filter((item) => {
          if (item.answer > 0 && !this.isSubmitted) {
            this.isSubmitted = true;
          }
        });
      });
    }
  }
  submitReview() {
    this.userSubmitted = true;
    this.userSubmittedBtn = true;
    this.validation();
    var errors = this.QuestionList.filter((data) => {
      return !data.valid;
    });
    console.log(errors.length);
    if (errors.length == 0) {
      this.learningService
        .PostReview(this.QuestionList, this.Id, this.CourseId)
        .subscribe((data) => {
          this._alert.succuss("Review submitted successfully.");
          this.QuestionList.filter((data) => {
            data.valid=true;
          });
          this.userSubmitted=false;
          this.getCourse.emit();
          this.CloseModal.emit();
        });
    }
    console.log(this.QuestionList);
    this.userSubmittedBtn = false;
  }
  validation() {
    this.QuestionList.filter((data) => {
      if (data.answer == null) {
        if (data.comment != null) {
          data.valid = true;
        } else {
          data.valid = false;
        }
      } else if (data.answer == 0) {
        if (data.comment != null) {
          data.valid = true;
        } else {
          data.valid = false;
        }
      } else {
        data.valid = true;
      }
    });
  }
}
