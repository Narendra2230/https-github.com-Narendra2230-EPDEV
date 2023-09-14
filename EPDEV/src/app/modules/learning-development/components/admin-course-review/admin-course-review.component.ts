import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LearningService } from "src/app/services/learning/learning.service";
import { CourseReviewDTO, CourseReviewList } from "../../model/courseformVM";

@Component({
  selector: "app-admin-course-review",
  templateUrl: "./admin-course-review.component.html",
  styleUrls: ["./admin-course-review.component.css"],
})
export class AdminCourseReviewComponent implements OnInit {
  reviewObj: CourseReviewDTO = new CourseReviewDTO();
  reviewList: CourseReviewList[] = [];
  reviewList1: CourseReviewList[] = [];
  courseId: number = 0;
  searchKeyWord: string = "";
  constructor(
    private learningService: LearningService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseId = this.route.snapshot.params.id;
    this.GetCoursesReview(this.courseId);
  }
  ngOnInit() {}
  search() {
    if (this.searchKeyWord != "") {
      let searchData = this.reviewList1.filter((data) => {
        return (
          data.employeeName.includes(this.searchKeyWord)
        );
      });
      this.reviewList = searchData;
    } else {
      this.reviewList = this.reviewList1;
    }
  }
  GetCoursesReview(courseId) {
    this.learningService.GetCourseReview(courseId).subscribe((data) => {
      console.log(data)
      this.reviewObj=data;
      this.reviewList = data.reviewList;
      this.reviewList1 = data.reviewList;
    });
  }
}
