import { Component, OnInit, Input } from '@angular/core';
import { OrgHierarchyService } from 'src/app/services/Org-hierarchy/org-hierarchy.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';
@Component({
  selector: 'app-project-hierarchy',
  templateUrl: './project-hierarchy.component.html',
  styleUrls: ['./project-hierarchy.component.css']
})
export class ProjectHierarchyComponent implements OnInit {
  
  private projects: any = [];
  private employee: any = {};
  private empList: any = [];
  selectedItem:any='';
  scrollLeftValue:any;
  nextChildTickets:any;
  clientId:any;
  moswId:any;
  resetHirarchy(){
    this.selectedItem='';
  }
  constructor(private orgService: OrgHierarchyService,private _session: SessionServiceService) { }

  ngOnInit() {
    let obj = {
      EMPID: this._session.getUserID()//1941//1941,100370,3050
    }
    // console.log(obj)
    this.orgService.getProjectDetails(obj).subscribe(res => {
     this.projects = res;
      //this.employee = this.team[0];
      //this.manager = this.employee.lstParent[0]
      // console.log(res);
      // console.log(this.projects);
    })

  }
  
  nextClick(event,index,data) {
    this.clientId=data.clientId;
    this.moswId=data.msowId;
    if(event.target.classList.contains('fa-minus')){
      this.selectedItem="";
    }
    else{
      this.selectedItem=event.target.parentNode.parentNode.id;
      this.scrollLeftValue=event.pageX-300;
    }
    let clientObj = {
      "ClientId":data.clientId,
	    "msowId": data.msowId
    }
    this.projects[index].isShow = !this.projects[index].isShow;
    this.orgService.getClientHierarchy(clientObj).subscribe(res => {
      this.empList = res;
      // console.log(res,'res');
      this.projects[index].empList = this.empList.lstEmployees;
      // console.log(this.projects[index].empList,'empList');
  //    console.log(res);
      // console.log(this.projects[index].empList[0],'empList[0]');
      this.nextChildTickets=this.projects[index].empList;
      // console.log('next child tickets',this.nextChildTickets);
    })
    
  }
}

@Component({
  selector: 'app-emp-leads-list',
  templateUrl: './empLeadsList.html',
  styleUrls: ['./project-hierarchy.component.css']
})
export class LeadsListComponent implements OnInit {
  modelData:any;
  modelBorder:any;
  childlevel:any;
  childTickets:any;
  parentLevel:any;
  modelId='';
  data: any;
  selectedItem:any;
  scrollLeftValue:any;
  nextLevelChildren:any;
  clientId:any;
  moswId:any;
  @Input() set newtickets(a){
    this.childlevel=Number(a.level);
    this.childTickets=a.childTicketsInp;
    this.parentLevel=Number(a.parent);
    this.modelId="MODEL"+a.level+"-CHILD+"+this.parentLevel+"-PARENT";
    this.moswId=a.moswId;
    this.clientId=a.clientId;
  }
  private sundata = [{}, {}, {}, {}, {}, {}]
  constructor(private orgService: OrgHierarchyService) {
    
   }

  ngOnInit() {
    // console.log("Inside Componet");
    // console.log(this);
  }
  enableViewMore(ind,length){
    if(ind==3 && length>4 ){
      return true
    }
    else{
      return false
    }
  }
  updateModel(a,data){
    // console.log('ticket',data);
    this.modelData=data;
    if(data.hierarchyColor){
      this.modelBorder=data.hierarchyColor;
    }
    else{
      this.modelBorder='defaultBorder';
    }
    let element:HTMLElement=document.getElementById(this.modelId+"CTA") as HTMLElement;
    setTimeout(res=>{
      element.click();
    },500)
   
  }
  viewMore(a){
    a.target.parentNode.parentNode.parentNode.classList.remove('view-more');
    a.target.parentNode.parentNode.parentNode.parentNode.classList.remove('hide-greater-three');
    a.target.classList.add('hide');
 }
  viewNext(a,i,d){

    if(a.target.classList.contains('fa-minus')){
      this.selectedItem="";
    }
    else{
      this.selectedItem=a.target.parentNode.parentNode.parentNode.parentNode.id;
      this.scrollLeftValue=a.pageX;
    }
    // console.log('selected Item',this.selectedItem);
    const {hierarchyColor="defaultBorder"}=d;
    let obj = {
      // 'ClientId': this.clientId,
      // 'msowId': this.moswId,
      'ClientId': '298',
      'msowId': '611',
      "LeadLevel":this.childlevel
    }
    // console.log('object',obj)
    this.nextLevelChildren='';
    this.orgService.getClientHierarchy(obj).subscribe((res: any) => {
      console.log('res for >1 level',res.lstEmployees);
      this.nextLevelChildren=res.lstEmployees;
      console.log('next level',this.nextLevelChildren);
    })
    
  }


}
