import { Component, Input, OnInit, Output,EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertMessageService } from "src/app/services/alert-message.service";
import { LearningService } from "src/app/services/learning/learning.service";
import { courseformVM, CourseTile } from "../../model/courseformVM";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.css"],
})
export class CourseFormComponent implements OnInit {
  @Input() popup: string = "";
  @Input() course: CourseTile = new CourseTile();
  @Output() GetCourses =new EventEmitter();
  userSubmitted: boolean = false;
  courseFormGroup: FormGroup;
  courseId: number = 0;
  courseImage: File = null;
  courseData: courseformVM;
  todate: Date = new Date();
  minDate: string = "";
  constructor(
    private fb: FormBuilder,
    private _alert: AlertMessageService,
    private service: LearningService
  ) {}

  ngOnInit() {
    this.CreateCourseForm();
    this.CheckCourseInput(this.course);
    var month =
      this.todate.getMonth() < 9
        ? "0" + (this.todate.getMonth() + 1)
        : this.todate.getMonth() + 1;
    var day =
      this.todate.getDate() < 9
        ? "0" + this.todate.getDate()
        : this.todate.getDate();
    this.minDate = this.todate.getFullYear() + "-" + month + "-" + day;
  }
  CheckCourseInput(course: CourseTile) {
    if (course != undefined) {
      if (course.courseId != 0) {
        this.courseId = course.courseId;
        var date2 = new Date(course.date);
        var month =
          date2.getMonth() > 9
            ? date2.getMonth() + 1
            : "0" + (date2.getMonth() + 1);
        var day = date2.getDay() > 9 ? date2.getDay() : "0" + date2.getDay();
        var date1 = date2.getFullYear() + "-" + month + "-" + day;
        this.courseFormGroup = this.fb.group({
          date: [date1, Validators.required],
          startTime: [course.startTime, Validators.required],
          endTime: [course.endTime, Validators.required],
          title: [course.title, Validators.required],
          trainingType: [course.trainingType, Validators.required],
          duration: [course.duration, Validators.required],
          courseURL: [course.courseUrl, Validators.required],
          courseType: [course.courseType, Validators.required],
          trainer: [course.trainer, Validators.required],
        });
      }
      else {
        this.courseFormGroup = this.fb.group({
          date: [null, Validators.required],
          startTime: [null, Validators.required],
          endTime: [null, Validators.required],
          title: [null, Validators.required],
          trainingType: [null, Validators.required],
          duration: [null, Validators.required],
          courseURL: [null, Validators.required],
          courseType: [null, Validators.required],
          trainer: [null, Validators.required],
        });
      }
    } else {
      this.courseFormGroup = this.fb.group({
        date: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        title: [null, Validators.required],
        trainingType: [null, Validators.required],
        duration: [null, Validators.required],
        courseURL: [null, Validators.required],
        courseType: [null, Validators.required],
        trainer: [null, Validators.required],
      });
    }
  }
  CreateCourseForm() {
    this.courseFormGroup = this.fb.group({
      date: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      title: [null, Validators.required],
      trainingType: [null, Validators.required],
      duration: [null, Validators.required],
      courseURL: [null, Validators.required],
      courseType: [null, Validators.required],
      trainer: [null, Validators.required],
    });
  }
  get date() {
    return this.courseFormGroup.get("date") as FormControl;
  }
  get startTime() {
    return this.courseFormGroup.get("startTime") as FormControl;
  }
  get endTime() {
    return this.courseFormGroup.get("endTime") as FormControl;
  }
  get title() {
    return this.courseFormGroup.get("title") as FormControl;
  }
  get trainingType() {
    return this.courseFormGroup.get("trainingType") as FormControl;
  }
  get duration() {
    return this.courseFormGroup.get("duration") as FormControl;
  }
  get courseURL() {
    return this.courseFormGroup.get("courseURL") as FormControl;
  }
  get courseType() {
    return this.courseFormGroup.get("courseType") as FormControl;
  }
  get trainer() {
    return this.courseFormGroup.get("trainer") as FormControl;
  }
  changeTime() {
    if (this.startTime.value != null && this.endTime.value != null) {
      var dura = this.diff(this.startTime.value, this.endTime.value);
      if (+dura > 0) {
        this.courseFormGroup.controls["duration"].setValue(dura);
      }
    }
  }
  diff(start: any, end: any) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diffs = endDate.getTime() - startDate.getTime();
    var hours = Number(diffs / 1000 / 60 / 60).toFixed(1);
    return hours;
  }
  onSubmit() {
    this.userSubmitted = true;
    if (this.courseFormGroup.valid) {
      const formData = new FormData();
      formData.append("courseId", this.courseId.toString());
      formData.append("courseImage", this.courseImage);
      formData.append("date", this.date.value);
      formData.append("startTime", this.startTime.value);
      formData.append("endTime", this.endTime.value);
      formData.append("title", this.title.value);
      formData.append("trainingType", this.trainingType.value);
      formData.append("duration", this.duration.value);
      formData.append("courseURL", this.courseURL.value);
      formData.append("courseType", this.courseType.value);
      formData.append("trainer", this.trainer.value);
      this.service.AddFileDetails(formData).subscribe((result) => {
        this._alert.succuss("Course submitted successfully.");
        window.location.reload();
      });
      this.userSubmitted = false;
    } else {
      this.userSubmitted = false;
      this._alert.error("Kindly provide the required fields");
    }
  }
  onSelectFile(event: any) {
    const file = event.target.files;
    this.courseImage = file[0];
  }
  CourseData(): courseformVM {
    return (this.courseData = {
      courseId: this.courseId,
      date: this.date.value,
      startTime: this.startTime.value,
      endTime: this.endTime.value,
      title: this.title.value,
      trainingType: this.trainingType.value,
      duration: this.duration.value,
      courseURL: this.courseURL.value,
      courseImage: this.courseImage,
      courseType: this.courseType.value,
      trainer: this.trainer.value,
    });
  }
}
