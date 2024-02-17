import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { ActivityForm } from '../../models/ActivityDTO';

@Component({
  selector: 'app-activity-management',
  templateUrl: './activity-management.component.html',
  styleUrls: ['./activity-management.component.css']
})
export class ActivityManagementComponent implements OnInit {
  popup:string='';
  courseFormGroup: FormGroup;
  activityData:ActivityForm=new ActivityForm();
  constructor(
    private fb: FormBuilder,
    private _alert: AlertMessageService) { }

  ngOnInit() {
    this.CreateCourseForm();
  }
  CreateCourseForm() {
    this.courseFormGroup = this.fb.group({
      Name: [null, Validators.required],
    });
  }
  get Name() {
    return this.courseFormGroup.get("Name") as FormControl;
  }
  onSubmit(){

  }
  ActivityData(): ActivityForm {
    return (this.activityData = {
     activityId:this.activityData.activityId,
     name:this.Name.value
    });
  }
}
