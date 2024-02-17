import { getLocalePluralCase } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { EncryptionService } from "src/app/services/encryption.service";
import { LearningService } from "src/app/services/learning/learning.service";
import {
  AssociateEnrollmentDTO,
  CourseProgress,
} from "../../model/courseformVM";
import { AssociateCourseReviewComponent } from "../associate-course-review/associate-course-review.component";

@Component({
  selector: "app-associate-page",
  templateUrl: "./associate-page.component.html",
  styleUrls: ["./associate-page.component.css"],
})
export class AssociatePageComponent implements OnInit {
  private gridApi;

  @ViewChild(AssociateCourseReviewComponent, { static: true })
  AssociateCourseReviewComponent: AssociateCourseReviewComponent;

  displayedColumns: string[] = [
    "no",
    "date",
    "title",
    "courseType",
    "trainingMode",
    "duration",
    "status",
  ];
  displayedColumnDefs = [
    {
      field: "no",
      headerName: "No",
      width: 80,
    },
    {
      field: "date",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Enroll Date",
      sortable: true,
      width: 120,
    },
    {
      field: "title",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Course",
      sortable: true,
      width: 220,
    },
    {
      field: "courseType",
      headerName: "Cource Type",
      width: 160,
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: { suppressAndOrCondition: true },
    },
    {
      field: "trainingMode",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Training Mode",
      sortable: true,
      width: 160,
    },
    {
      field: "duration",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Duration",
      sortable: true,
      width: 160,
    },
    {
      field: "status",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Status",
      sortable: true,
      width: 150,
    },
  ];
  displayedRowData = [];
  loading = false;
  courseProgress: CourseProgress[] = [];
  data = new MatTableDataSource();
  resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  CourseList1: AssociateEnrollmentDTO[] = [];
  CourseList: AssociateEnrollmentDTO[] = [];
  Id: any;
  Employee: any;
  CourseId: number = 0;
  CourseType: string = "";
  CourseName: string = "";
  history: string = "";
  Trainer: string = "";
  isModal: boolean = false;
  constructor(
    private learningService: LearningService,
    private dataService: DataService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit() {
    let user = localStorage.getItem("USER_SESSION_DETAILS").toString();
    let JsonUser = JSON.parse(user);
    var halfPart = JsonUser.toString().split('"id":')[1].split(",")[0];
    this.Id = halfPart;
    this.getEmployeeDetail();
    this.getCourse();
    this.GetCourseProgress();
  }
  OpenModal(item: AssociateEnrollmentDTO) {
    this.isModal = true;
    this.CourseId = item.courseId;
    this.CourseType = item.courseType;
    this.CourseName = item.title;
    this.Trainer = item.trainer;
    this.AssociateCourseReviewComponent.GetReviewQuestions(
      this.Id,
      this.CourseId,
      this.CourseType
    );
  }
  CloseModal(status: boolean) {
    this.isModal = status;
  }
  historyFilter() {
    if (this.history != "") {
      if (this.history == "Yet to complete") {
        var searchData = this.CourseList1.filter((data) => {
          return data.status == "Yet to complete";
        });
        this.CourseList = searchData;
      } else {
        var searchData = this.CourseList1.filter((data) => {
          return data.status == "Completed";
        });
        this.CourseList = searchData;
      }
    } else {
      this.CourseList = this.CourseList1;
    }
  }
  getEmployeeDetail() {
    this.learningService.getEmployeeDetail(this.Id).subscribe((data) => {
      this.Employee = data;
      console.log(data);
    });
  }
  GetCourseProgress() {
    this.learningService.GetCourseProgress(this.Id).subscribe((data) => {
      this.courseProgress = data;
      console.log(data);
    });
  }
  getCourse() {
    this.learningService.GetAssociateEnrollment(this.Id).subscribe((data) => {
      this.CourseList = data;
      this.CourseList1 = data;
      data.map((data, index) => {
        data.no = index + 1;
        var tempDate = new Date(data.date);
        var month =
          tempDate.getMonth() + 1 > 9
            ? tempDate.getMonth() + 1
            : "0" + (tempDate.getMonth() + 1);
        var day =
          tempDate.getDate() > 9
            ? tempDate.getDate()
            : "0" + tempDate.getDate();
        data.date = tempDate.getFullYear() + "-" + month + "-" + day;
      });
      this.data = new MatTableDataSource(data);
      this.displayedRowData = data;
      // console.log(this.displayedRowData);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      // console.log("chadrna", this.sort);
      this.loading = false;
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
}
