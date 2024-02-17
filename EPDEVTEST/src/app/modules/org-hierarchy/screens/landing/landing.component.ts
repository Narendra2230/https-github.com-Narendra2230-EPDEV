import { Component, OnInit, Input } from '@angular/core';
import { OrgHierarchyService } from 'src/app/services/Org-hierarchy/org-hierarchy.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  private team: any = [];
  modelData:any; 
  res: any = [];
  filteredOptions: Observable<string[]>;
  constructor(private orgService: OrgHierarchyService,private router:Router,private titlecasePipe:TitleCasePipe) {

   }
  
  ngOnInit() {
   this.getOrgHeirarchy();
   this.getAllEmployeeDetails();
  
  }

  private _filter(value: string): string[] {
    // console.log('calling',value);
   
     const filterValue = this._normalizeValue(value);
     this.dataListValues = this.res;
    //  console.log(this.dataListValues);
     return this.dataListValues.filter(street => this._normalizeValue((street.firstName+" "+street.lastName)).includes(filterValue));
  }
  
  getSelectedValue(value) {
    // console.log("In getSelectedValue")
    let selectedName = value;
    // console.log("datalist",this.dataListValues);
    let list:any = this.dataListValues.filter(x => (x.firstName+" "+x.lastName) == selectedName)[0]; 
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  selectedItem:any='';
  searchEmployeeForm = new FormControl();
  filteredStreets: Observable<string[]>;
  selectedLevel:any='';
  viewMoreSelected:string='';
  modelBorder:string;
  formatToInitial:boolean=true;
  scrollLeftValue:any;
  searchName:string="";
  dataListValues:any[] = [];
  selectedEmployee:any;
  searchNameInput: any; 
  
  /* search employee */
  resetSearch(a:HTMLInputElement){
    this.searchEmployeeForm.setValue('');
  // this.searchEmployeeForm.valueChanges
  this.searchEmployeeForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    this.getOrgHeirarchy();
  }
   getOrgHeirarchy(){
    this.orgService.getOrgHierarchy({}).subscribe(res => {

      this.team = res;
      //this.modelData= res.lstChildren;
    })
   }
   getAllEmployeeDetails(){
    this.orgService.getAllEmpDetails({"EMPID" : ''}).subscribe(response => {
      this.dataListValues.splice(0); 
      console.log(response)
      this.res = response;
      this.filteredOptions = this.searchEmployeeForm.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      // this.dataListValues = this.dataListValues.concat(res.response.filter(x => (x.firstName.indexOf(a.target.value) > -1 || x.lastName.indexOf(a.target.value) > -1)))
      //this.modelData= res.lstChildren;
    })
   }
  fetchDataList(a){
    
    let obj ={
      "EMPID":"0",
      "Reporting_Manager":"0",
      "Name":a.target.value
      }
      
      if(a.key){
        this.dataListValues.splice(0); 
        this.dataListValues = this.dataListValues.concat(this.res.filter(x => (x.firstName.indexOf(a.target.value) > -1 || x.lastName.indexOf(a.target.value) > -1)))
      }

  //  if( res.response.filter(x => (x.firstName+" "+x.lastName) == a.target.value)[0]){
  //  }else {
  //   this.dataListValues.splice(0); 
  //   this.dataListValues = this.dataListValues.concat(res.response.filter(x => (x.firstName.indexOf(a.target.value) > -1 || x.lastName.indexOf(a.target.value) > -1)))


    // this.orgService.getEmpNames(obj).subscribe((res: any) => {
    //   for(var i=0;i<res.length;i++){
    //     // let name = res[i].firstName+" "+res[i].lastName
    //     this.dataListValues.push(res[i]);
    //   }
    // })
   
  //  }
      
  }

  navigateMyLine(a:HTMLInputElement) {
    
    let selectedName = this.searchEmployeeForm.value;

    let list:any = this.dataListValues.filter(x => (x.firstName+" "+x.lastName) == selectedName)[0];

    if(list.id != undefined ) {
      sessionStorage.setItem('selectedEmpId', list.id);
      setTimeout(res=>{
        sessionStorage.setItem('selectedEmpId', '');
      },1000)
      // this.router.navigate(['/','my-reporting']);
    let  obj = {
        EMPID: sessionStorage.getItem('selectedEmpId')
      }
this.getHirarchy(obj);

    }
  }
  getHirarchy(obj){
    this.orgService.getEmpHierarchy(obj).subscribe(res => {
      this.team = res;
      // this.employee = this.team[0];
      // this.manager = this.employee.lstParent.length>-1?this.employee.lstParent[0]:undefined

    })
  }

  /* search employee end */

  resetHirarchy(){
    this.selectedItem='';
    this.searchEmployeeForm.setValue('');
    this.getOrgHeirarchy();
  }
  updateModel(a,data){

    this.modelData=data;
    if(data.hierarchyColor){
      this.modelBorder=data.hierarchyColor;
    }
    else{
      this.modelBorder='defaultBorder';
    }
    let element:HTMLElement=document.getElementById('launchModel') as HTMLElement;
    setTimeout(res=>{
      element.click();
    },500)
   
  }
  viewNext(a,i,d){
    if(a.target.classList.contains('fa-minus')){
      this.selectedItem='';
    }
    else{
      this.selectedItem=a.target.parentNode.parentNode.parentNode.parentNode.id;
      this.scrollLeftValue=a.pageX;
    }
}
  nextClick(data) {
    this.team[data].isShow = !this.team[data].isShow;
    this.team = this.team;

  }

}

@Component({
  selector: 'app-emp-profile',
  templateUrl: './profile.html',
  styleUrls: ['./landing.component.css']
})
export class ProfileComponent{
  modelBorderData:string;
  profileData:any = [];
  modelId:"";
  @Input() set profile(a){
    this.modelBorderData=a.modelBorder;
    this.profileData=a.modelData;
    this.modelId=a.modelId || "myModal";
  }
  ngOnInit(){
    //console.log(this.profileData);
  }
}

@Component({
  selector: 'app-emp-list',
  templateUrl: './list.html',
  styleUrls: ['./landing.component.css']
})
export class ListComponent implements OnInit {
  data: any = [];
  childlevel:any;
  childTickets:any;
  modelData:any;
  modelBorder:any;
  selectedItem:any;
  parentLevel:any;
  modelId="";
  scrollLeftValue:any;
  @Input() set newtickets(a){
    this.childlevel=Number(a.level);
    this.childTickets=a.childTicketsInp;
    this.parentLevel=Number(a.parent);
    this.modelId="MODEL"+a.level+"-CHILD+"+this.parentLevel+"-PARENT";
  }
  //constructor()
  
  enableViewMore(ind,length){
    if(ind==3 && length>4 ){
      return true
    }
    else{
      return false
    }
  }
  updateModel(a,data){
  //  console.log(data);
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
  private sundata = [{}, {}, {}, {}, {}, {}]
  constructor(private orgService: OrgHierarchyService,private titlecasePipe:TitleCasePipe) { }

  ngOnInit() {

  }
  viewNext(a,i,d){
    
    if(a.target.classList.contains('fa-minus')){
      this.selectedItem="";
    }
    else{
      this.selectedItem=a.target.parentNode.parentNode.parentNode.parentNode.id;
      this.scrollLeftValue=a.pageX;
    }
    const {hierarchyColor="defaultBorder"}=d;
    
    // document.getElementById('simplebar').scrollTop=a.pageY+120;
    let obj = {
      EMPID: d.id,
      Reporting_Manager: d.reportManagerID,
      Name: ""
    }
//    console.log(d.id);
//    console.log(d.reportManagerID);
    this.orgService.getEmpHierarchy(obj).subscribe((res: any) => {
//   console.log(d.id);
//   console.log("response"+res[0]);
      //const { data } = this;
      //console.log(this.childTickets);
     // data.forEach(e => e.isShow = false);

     this.childTickets[i].isShow = !this.childTickets[i].isShow;
     //this.team[i].childs = this.team;
      d.lstChildren = res.lstChildren;
      for(var k=0;k< this.childTickets.length;k++){
        if(this.childTickets[i].id == res[0].id){
          let childsData=res[0].lstChildren;
          childsData=childsData.map(c=>({...c,...{hierarchyColor}}));
          this.childTickets[i].lstChildren =childsData;// res[0].lstChildren;
   //       console.log("ids are equal");
        }
      }
      //this.data = data;
    //  console.log("After");
    //  console.log(this.childTickets);
    })
  }
  viewMore(a){
    a.target.parentNode.parentNode.parentNode.classList.remove('view-more');
    a.target.parentNode.parentNode.parentNode.parentNode.classList.remove('hide-greater-three');
    a.target.classList.add('hide');
 }
  nextClick( i, d, s, d1) {
    let obj = {
      EMPID: d.id,
      Reporting_Manager: d.reportManagerID,
      Name: ""
    }

this.orgService.getEmpHierarchy(obj).subscribe((res: any) => {
//      console.log(d);
//      console.log("response"+res[0]);
      const { data } = this;
      // console.log(data);
      data.forEach(e => e.isShow = false);

      data[i].isShow = !data[i].isShow;
     // data[i].childs = data;
      //d.lstChildren = res.lstChildren;
      for(var k=0;k< data.length;k++){
        if(data[i].id == res[0].id){
          data[i].lstChildren = res[0].lstChildren;
          // console.log("ids are equal");
        }
      }
      this.data = data;
    //  console.log("After");
    //  console.log(data);
    })
}

}