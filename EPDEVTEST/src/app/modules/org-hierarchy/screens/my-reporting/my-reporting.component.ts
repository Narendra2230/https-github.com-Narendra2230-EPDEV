import { Component, OnInit } from '@angular/core';
import { OrgHierarchyService } from 'src/app/services/Org-hierarchy/org-hierarchy.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-my-reporting',
  templateUrl: './my-reporting.component.html',
  styleUrls: ['./my-reporting.component.css']
})
export class MyReportingComponent implements OnInit {

  private team: any = [];
  private employee: any = {};
  private manager: any = {};
  modelData: any;
  modelBorder:string;
  constructor(private orgService: OrgHierarchyService,private _session: SessionServiceService) { }

  ngOnInit() {
    let obj={};
    if(sessionStorage.getItem('selectedEmpId')!=''){
      obj = {
        EMPID: sessionStorage.getItem('selectedEmpId')
      }
    }
    else{
      obj = {
        EMPID: this._session.getUserID()//1941//1941,100370,
      }
    }
    this.getHirarchy(obj);
  }
  getHirarchy(obj){
    this.orgService.getEmpHierarchy(obj).subscribe(res => {
      this.team = res;
      this.employee = this.team[0];
      this.manager = this.employee.lstParent.length>-1?this.employee.lstParent[0]:undefined
      console.log('manager',this.manager)
      // console.log('res',res);
   //   console.log(this.team[0].id);
    })
  }
  resetReporting(){
    let obj = {
      EMPID: this._session.getUserID()
    }
    this.getHirarchy(obj);
  }
  enableViewMore(ind,length){
    if(ind==3 && length>4 ){
      return true
    }
    else{
      return false
    }
  }
  viewMore(a){
    a.target.parentNode.parentNode.parentNode.classList.remove('view-more');
    a.target.parentNode.parentNode.parentNode.parentNode.classList.remove('hide-greater-three');
    
    a.target.classList.add('hide');
 }

 updateModel(a,data){
 // console.log(data);
  this.modelData=data;
  if(data.hierarchyColor){
    this.modelBorder=data.hierarchyColor;
  }
  else{
    this.modelBorder='defaultBorder';
  }
  let element:HTMLElement=document.getElementById('launchModel') as HTMLElement;
  element.click();
}
}
