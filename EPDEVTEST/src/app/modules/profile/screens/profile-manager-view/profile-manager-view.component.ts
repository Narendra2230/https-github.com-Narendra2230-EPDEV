import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SessionServiceService } from 'src/app/services/session/session-service.service';

@Component({
  selector: 'app-profile-manager-view',
  templateUrl: './profile-manager-view.component.html',
  styleUrls: ['./profile-manager-view.component.css']
})
export class ProfileManagerViewComponent implements OnInit {
  hrAssociates: any = [];
  displayedColumns: string[] = ['avathar', 'empName', 'leaveType', 'fromDate', 'toDate', 'strNumber_of_Days', 'leaveStatusDesc', 'locatioN_NAME'];
  loading  = false;
  data = new MatTableDataSource();
  resultsLength = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private profileService: ProfileService, private session: SessionServiceService,
    private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.init()
  }
  init() {
    this.getPersonalInfo();

  }
  formatDate(date) {

    return date;
  }
  filterTable (filterValue :string) { 
    this.data.filter = filterValue.trim().toLowerCase(); 
 }
 enCryptEmpID(s){
  return this.encryptionService.enCryptEmpID(s);
}
  getPersonalInfo() {
    this.loading  = true;
    const payload = {
      EmpId: this.session.getUserID()
    };
    this.profileService.GetFinanceAssociateInfo(payload).subscribe((res: any) => {
      this.data = new MatTableDataSource(res);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      this.loading  = false;
    })
  }
  checkImage(avatar) {
    if (avatar != null && avatar != undefined && avatar != "null" && avatar != "")
      return avatar;
    return "assets/images/leave/default_avatar.svg";
  }
}
