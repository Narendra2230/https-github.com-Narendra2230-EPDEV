import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { LearningService } from "src/app/services/learning/learning.service";
import { CourseTile } from "../../model/courseformVM";
import { CourseFormComponent } from "../course-form/course-form.component";
import { CourseActionButtonRenderer } from "./course-action-button-renderer";
import { AdminCourseStatusRenderer } from "./admin-course-status-renderer";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"],
})
export class AdminPageComponent implements OnInit {
  @ViewChild(CourseFormComponent, { static: true })
  courseFormComponent: CourseFormComponent;
  data = new MatTableDataSource();
  loading = true;
  displayedColumnDefs = [
    {
      field: "srNo",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Sr",
      cellRenderer: "srNo",
      sortable: true,
      width: 30,
    },
    {
      field: "title",
      filter: "agTextColumnFilter",
      headerName: "Title",
      cellRenderer: "title",
      sortable: true,
      width: 250,
    },
    {
      field: "trainer",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Trainer",
      cellRenderer: "trainer",
      sortable: true,
      width: 200,
    },
    {
      field: "courseType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Course Type",
      cellRenderer: "courseType",
      sortable: true,
      width: 200,
    },
    {
      field: "duration",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Duration",
      cellRenderer: "duration",
      sortable: true,
      width: 200,
    },
    {
      field: "dateStr",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Date",
      cellRenderer: "dateStr",
      sortable: true,
      width: 200,
    },
    {
      field: "timeStr",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Time",
      cellRenderer: "timeStr",
      sortable: true,
      width: 200,
    },
    {
      field: "enrollment",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Enrollment",
      cellRenderer: "enrollment",
      sortable: true,
      width: 200,
    },
    {
      field: "completed",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Completed",
      cellRenderer: "completed",
      sortable: true,
      width: 200,
    },
    {
      field: "review",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Review",
      cellRenderer: "review",
      sortable: true,
      width: 200,
    },
    {
      field: "status",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Status",
      cellStyle: { textAlign: "center" },
      width: 100,
    },
    {
      field: "status",
      cellRenderer: "statusRenderer1",
      cellRendererParams: { onStatusChange: this.OpenCreateCourseModal.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Action",
      cellStyle: { textAlign: "center" },
      width: 200,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  selectedSowId = 0;
  frameworkComponents = {
    statusRenderer: AdminCourseStatusRenderer,
    statusRenderer1: CourseActionButtonRenderer,
  };
  private gridApi;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pageSize: number = 10;
  popup = "";
  searchKeyword = "";
  selectedItem: any;
  ListOfCourse: CourseTile[] = [];
  ListOfCourse1: CourseTile[] = [];
  PaginationList: number[] = [];
  selectCourse: CourseTile = new CourseTile();
  selectCourse1: CourseTile = new CourseTile();
  constructor(
    private learningService: LearningService,
    private _alert: AlertMessageService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.GetCourses();
  }
  GetCourses() {
    this.learningService.GetCourses(0).subscribe((data: any[]) => {
      this.ListOfCourse = data;
      this.ListOfCourse1 = data;
      data.filter((item) => {
        item.dateStr = this.changeData(item.date);
        item.timeStr =
          this.changeTime(item.startTime) + " " + this.changeTime(item.endTime);
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

  changeData(date) {
    return this.dataService.dateFormatter(date, "dd-MM-yyyy");
  }
  changeTime(time) {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    let part = hour > 12 ? "pm" : "am";
    if (parseInt(hour) == 0) hour = 12;
    min = (min + "").length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + "").length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    // this.gridApi.sizeColumnsToFit();
  }
  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
  searchFun() {
    if (this.searchKeyword == "") {
      this.ListOfCourse = this.ListOfCourse1;
    } else {
      var searchList = this.ListOfCourse1.filter((data) => {
        return data.title.includes(this.searchKeyword);
      });
      this.ListOfCourse = searchList;
    }
  }
  OpenCreateCourseModal(modal: string, item: CourseTile) {
    this.selectedItem = item;
    if (item == undefined) {
      this.courseFormComponent.CheckCourseInput(this.selectCourse1);
    } else {
      this.courseFormComponent.CheckCourseInput(item);
    }
    this.popup = modal;
  }
  CloseCreateCourseModal() {
    this.popup = "";
  }
  OnbtnSubmit() {
    this.courseFormComponent.onSubmit();
    this.popup = "";
  }
  changeStatus(courseId: number, e: any) {
    var payload = {
      status: e.target.checked,
      courseId: courseId,
    };
    this.learningService.UpdateStatus(payload).subscribe((data) => {
      this._alert.succuss("Course status updated successfully.");
    });
  }
}
