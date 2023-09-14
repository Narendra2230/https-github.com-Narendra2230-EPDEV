import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { LearningService } from 'src/app/services/learning/learning.service';
import { CourseTile } from '../../model/courseformVM';

@Component({
  selector: 'app-admin-hr-page',
  templateUrl: './admin-hr-page.component.html',
  styleUrls: ['./admin-hr-page.component.css']
})
export class AdminHrPageComponent implements OnInit {

  ListOfCourse: CourseTile[] = [];
  ListOfCourse1: CourseTile[] = [];
  searchKeyword = "";
  pageSize:number=10;
  PaginationList: number[] = [];


  constructor(
    private learningService: LearningService,
    private _alert: AlertMessageService
  ) {}
  ngOnInit() {
    this.GetCourses();
  }
  GetCourses() {
    this.learningService.GetCourses(0).subscribe((data: CourseTile[]) => {
      this.ListOfCourse = data;
      this.ListOfCourse1 = data;
      var count = Math.round(data.length / this.pageSize);
      for (let i = 0; i < count; i++) {
        this.PaginationList.push(i + 1);
      }
    });
  }
  navClick(item) {
    var index = item - 1;
    var fromIndex = index * this.pageSize;
    var toIndex = item * this.pageSize;
    var list = this.ListOfCourse1.slice(fromIndex, toIndex);
    this.ListOfCourse=list;
    console.log(fromIndex,toIndex)
  }
  searchFun(){
    if(this.searchKeyword==''){
      this.ListOfCourse=this.ListOfCourse1;
    }else{
      var searchList=this.ListOfCourse1.filter((data)=>{
        return data.title.includes(this.searchKeyword);
      })
      this.ListOfCourse=searchList;
    }
  }

}
