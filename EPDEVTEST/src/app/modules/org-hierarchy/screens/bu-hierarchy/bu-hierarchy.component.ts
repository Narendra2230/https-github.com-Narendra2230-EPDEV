import { Component, OnInit, Input } from '@angular/core';
import { OrgHierarchyService } from 'src/app/services/Org-hierarchy/org-hierarchy.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-bu-hierarchy',
  templateUrl: './bu-hierarchy.component.html',
  styleUrls: ['./bu-hierarchy.component.css']
})
export class BuHierarchyComponent implements OnInit {
  private bunits: any = [];
  private empList:any = [];
  selectedItem:any;
  scrollLeftValue:any;
  nextChildTickets:any;
 constructor(private orgService: OrgHierarchyService,private _session: SessionServiceService) { }

 ngOnInit() {
  let obj = {
    EMPID: this._session.getUserID()//1941//1941,100370,3050
  }
  console.log(obj)
  this.orgService.GetBUDetails(obj).subscribe(res => {
   this.bunits = res;
    //this.employee = this.team[0];
    //this.manager = this.employee.lstParent[0]
    console.log(this.bunits);
  })
}

nextClick(event,index,data) {
  if(event.target.classList.contains('fa-minus')){
    this.selectedItem="";
  }
  else{
    this.selectedItem=event.target.parentNode.parentNode.id;
    this.scrollLeftValue=event.pageX-300;
  }
  let clientObj = {
    // "EMPID": data.id,
    "BUId":data.buId,
    "BUName": data.buName
    // "BUId":"117",
    // "BUName":"0"
  }
  // this.bunits[index].isShow = !this.bunits[index].isShow;
  this.orgService.getBuHierarchy(clientObj).subscribe(res => {
    this.empList = res;
    // console.log(res);
    console.log(this.empList);
     this.nextChildTickets=this.empList;
  })  
  console.log('next',this.nextChildTickets);
}

};
@Component({
  selector: 'app-bu-leads-list',
  templateUrl: './buLeadsList.html',
  styleUrls: ['./bu-hierarchy.component.css']
})
export class BuLeadsListComponent implements OnInit {
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
  }
  private sundata = [{}, {}, {}, {}, {}, {}]
  constructor(private orgService: OrgHierarchyService) {
    console.log(this.childTickets);
   }

  ngOnInit() {
    // console.log("Inside Componet");
    // console.log(this);
    console.log(this.childTickets);
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
      "BUId":"117",
      "BUName":"0"
    }
    // console.log('object',obj)
    this.nextLevelChildren='';
    // this.orgService.getBuHierarchy(obj).subscribe((res: any) => {
    //   // console.log('res for >1 level',res.lstEmployees);
    //    this.nextLevelChildren=res[0].lstChildren;
    //   // console.log('next level',this.nextLevelChildren);
    //   console.log('child level',res[0].lstChildren)
    // }
    // )
  }
  }