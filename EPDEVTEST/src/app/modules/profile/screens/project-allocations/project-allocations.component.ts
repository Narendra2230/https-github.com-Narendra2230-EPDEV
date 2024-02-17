import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { DataService } from 'src/app/services/data.service';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-project-allocations',
  templateUrl: './project-allocations.component.html',
  styleUrls: ['./project-allocations.component.css']
})
export class ProjectAllocationsComponent implements OnInit {
  currentTab = "RA";
  current_empID: any;
  empAllocationDetails: unknown;
  billableHoursDetails: unknown;
  userType: any;'';
  public isLoading = false;
  public years = [];
  public currentYears:any = 0;

  constructor(
    private active_route: ActivatedRoute,
    private profileService: ProfileService,
    private dataService: DataService,
    private encryptionService: EncryptionService  ) { 
   
    this.userType = this.active_route.snapshot.params['userType'];
    this.current_empID =  this.encryptionService.deCryptEmpID(this.active_route.snapshot.params['empID']); 

    let max:any = new Date().getFullYear();
    this.currentYears = max-1;
    let min:any = max - 10;
    max = max + 1;    
    for(var i=min; i<=max; i++){
      this.years.push({"id":i,value:i});
    }    
  }


  ngOnInit() {
    this.GetEmpAllocationDetails();
    this.GetBillableHoursYearly(this.currentYears);
  }
  getRout() {
    const url = '/profile-landing';
    if (this.userType) {
      return `${url}/${this.userType}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
    }
    return `${url}/${this.encryptionService.enCryptEmpID(this.current_empID)}`;
  }

  empallOcationDetails(eacd){
    for(var i=0; i<eacd.length; i++){
      eacd[i].allocationStartDate =  eacd[i].allocationStartDate ? this.dataService.dateFormatter(eacd[i].allocationStartDate, "yyyy-MM-dd") : null;
      eacd[i].allocationEndDate =  eacd[i].allocationEndDate ? this.dataService.dateFormatter(eacd[i].allocationEndDate, "yyyy-MM-dd") : null;
    }  
    this.empAllocationDetails = eacd;
  }

  GetEmpAllocationDetails() {
    this.isLoading = true;
    const payload = {
      EmpId: this.current_empID
    };
    this.profileService.GetEmpAllocationDetails(payload).subscribe(res => {
      // this.empAllocationDetails = res;
      this.empallOcationDetails(res);
      this.isLoading = false;
    })
  }
  yearchange(e){
this.GetBillableHoursYearly(e.target.value)
  }

  GetBillableHoursYearly( currentYears) {
    this.isLoading = true;
    const payload = {
      Emp_Id: this.current_empID,
      Year: currentYears,
      IsIntialLoad:true
    };
    
    this.profileService.GetBillableHoursYearly(payload).subscribe(res => {
      this.billableHoursDetails = res;
      this.isLoading = false;
    })
  }

  tabClick(type, e) {
    e.preventDefault();
    this.currentTab = type;
  }
}
