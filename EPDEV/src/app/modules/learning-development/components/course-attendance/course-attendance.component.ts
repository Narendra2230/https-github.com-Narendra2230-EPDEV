import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { DataService } from "src/app/services/data.service";
import { LearningService } from "src/app/services/learning/learning.service";
import { EnrolledAssociateDTO } from "../../model/courseformVM";
import { CourseHoursRenderer } from "./course-hours-renderer";
import { CourseStatusRenderer } from "./course-status-renderer";

@Component({
  selector: "app-course-attendance",
  templateUrl: "./course-attendance.component.html",
  styleUrls: ["./course-attendance.component.css"],
})
export class CourseAttendanceComponent implements OnInit {
  data = new MatTableDataSource();
  loading = true;
  displayedColumnDefs = [
    {
      field: "status",
      cellRenderer: "statusRenderer1",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Action",
      cellStyle: { textAlign: "center" },
      width: 100,
    },
    {
      field: "employeeId",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Id",
      cellRenderer: "employeeId",
      sortable: true,
      width: 200,
    },
    {
      field: "employeeName",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Employee Name",
      cellRenderer: "employeeName",
      sortable: true,
      width: 180,
    },

    {
      field: "email",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Email",
      cellRenderer: "email",
      sortable: true,
      width: 250,
    },
    {
      field: "duration",
      cellRenderer: "statusRenderer",
      cellRendererParams: { onStatusChange: this.changeStatus.bind(this) },
      filter: "agTextColumnFilter",
      sortable: true,
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["startsWith"],
      },
      headerName: "Duration",
      cellStyle: { textAlign: "center" },
      width: 200,
    },

    {
      field: "trainingType",
      filter: "agTextColumnFilter",
      filterParams: { suppressAndOrCondition: true },
      headerName: "Training Type",
      cellRenderer: "trainingType",
      sortable: true,
      width: 200,
    },
  ];
  displayedRowData = [];
  allocationEmpId = [];
  selectedSowId = 0;
  frameworkComponents = {
    statusRenderer: CourseHoursRenderer,
    statusRenderer1: CourseStatusRenderer,
  };
  private gridApi;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  EnrolledEmployees: EnrolledAssociateDTO[] = [];
  EnrolledEmployees2: EnrolledAssociateDTO[] = [];
  EnrolledEmployees1: EnrolledAssociateDTO[] = [];
  courseId: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  constructor(
    private learningService: LearningService,
    private route: ActivatedRoute,
    private _alert: AlertMessageService,
    private router: Router
  ) {
    this.courseId = this.route.snapshot.params.id;
    this.GetCourses(this.courseId);
  }

  ngOnInit() {}
  GetCourses(CourseId) {
    this.learningService
      .GetEnrolledAssociate(CourseId)
      .subscribe((res: EnrolledAssociateDTO[]) => {
        this.EnrolledEmployees = res;
        this.data = new MatTableDataSource(res);
        this.displayedRowData = res;
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
  exportDataAsExcel() {
    this.gridApi.exportDataAsCsv();
  }
  changeStatus(data) {
    console.log(data);
    // this.selectedSowId = data.empid;
    // this.sowFullName = data.associateName;
    // this.associateEmployee.GetSwoAllocation(data.empid, data.associateName);
  }
  markedAttendance() {
    this.EnrolledEmployees2 = this.EnrolledEmployees.filter((data) => {
      return data.status;
    });
    console.log(this.EnrolledEmployees2);
    if (this.EnrolledEmployees2.length > 0) {
      this.learningService
        .PostAttendance(this.EnrolledEmployees2)
        .subscribe((data) => {
          this._alert.succuss("Attendance updated successfully.");
          this.router.navigate(["/admin-learning"]);
        });
    }
  }
}
